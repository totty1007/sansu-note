(function(){
  const S2 = '<sup>2</sup>';
  const mn = n => String(n).replace('-', '−');
  const rnz = (a, b) => { let v = 0; while (v === 0) v = rand(a, b); return v; };
  const g2 = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
  const isSq = n => { const r = Math.round(Math.sqrt(n)); return r * r === n; };
  function simp(n) { let k = 1; for (let i = 2; i * i <= n; i++) { while (n % (i * i) === 0) { n /= i * i; k *= i; } } return [k, n]; }

  // 項のリスト [[係数, 変数部分HTML], ...] を「符号つきの式」にする
  function expr(terms) {
    let s = '', first = true;
    for (const [c, v] of terms) {
      if (c === 0) continue;
      const ab = Math.abs(c);
      const body = (v === '') ? String(ab) : (ab === 1 ? v : ab + v);
      if (first) { s = (c < 0 ? '−' : '') + body; first = false; }
      else s += (c < 0 ? ' − ' : ' + ') + body;
    }
    return s || '0';
  }
  const P = (c2, c1, c0) => expr([[c2, 'x' + S2], [c1, 'x'], [c0, '']]);
  const lin = (p, q, v) => '(' + expr([[p, v || 'x'], [q, '']]) + ')';
  // (x+a)(x+b) を小さい順に並べて表示
  function fac(k, a, b) {
    const s = [a, b].sort((u, v) => u - v);
    const pre = k === 1 ? '' : (k === -1 ? '−' : String(k));
    return pre + lin(1, s[0]) + lin(1, s[1]);
  }
  // 平方根の表示 c√m
  function R(c, m) {
    if (m === 1) return mn(c);
    if (c === 0) return '0';
    const ab = Math.abs(c);
    return (c < 0 ? '−' : '') + (ab === 1 ? '' : ab) + sqrtHTML(m);
  }
  function RS(n) { const [k, m] = simp(n); return R(k, m); }
  // c√m / d を約分して表示
  function rf(c, m, d) {
    const g = g2(c, d); c /= g; d /= g;
    const num = R(c, m);
    return d === 1 ? num : fracHTMLRaw(num, d);
  }
  const frs = (n, d) => ((n < 0) !== (d < 0) ? '−' : '') + fracHTML(Math.abs(n), Math.abs(d));
  const roots = arr => { const u = Array.from(new Set(arr)).sort((a, b) => a - b); return 'x = ' + u.map(mn).join(', '); };
  const T = (text, explain, value, unit) => {
    if (value < 0) {
      // 負の答えは自動生成の誤答が不自然になるため、自作の誤答で4択にする
      const u = unit ? (unit === '°' ? unit : ' ' + unit) : '';
      const f = v => mn(v) + u;
      return mkCard(escHTML(text), f(value), [f(-value), f(value - 1), f(value + 1), f(value * 2), f(value - 2), f(value + 2)], explain);
    }
    return { kind: 'text', text, explain, answers: [Object.assign({ type: 'int', value }, unit ? { unit } : {})] };
  };
  const Q = html => '次の問いに答えなさい。<br>' + html;

  // ---------- 1. 多項式の展開 ----------
  function genExpand() {
    switch (rand(0, 6)) {
      case 0: {
        const a = rnz(-9, 9), b = rnz(-9, 9);
        const c = P(1, a + b, a * b);
        return mkCard('次の式を展開しなさい。<br>' + lin(1, a) + lin(1, b), c,
          [P(1, a + b, -a * b), P(1, a * b, a + b), P(1, a + b, 0), P(1, -(a + b), a * b), P(1, a - b, a * b)],
          '(x + a)(x + b) = x' + S2 + ' + (a + b)x + ab を使う。和は ' + mn(a + b) + '、積は ' + mn(a * b) + ' だから ' + c + '。');
      }
      case 1: {
        const a = rnz(-9, 9); if (Math.abs(a) < 2) return genExpand();
        const c = P(1, 2 * a, a * a);
        return mkCard('次の式を展開しなさい。<br>' + lin(1, a) + S2, c,
          [P(1, 0, a * a), P(1, a, a * a), P(1, 2 * a, -a * a), P(1, -2 * a, a * a)],
          '(x + a)' + S2 + ' = x' + S2 + ' + 2ax + a' + S2 + '。a = ' + mn(a) + ' だから、中の項は 2 × ' + mn(a) + ' = ' + mn(2 * a) + '、最後の項は ' + a * a + '（平方だから必ず正）。');
      }
      case 2: {
        const a = rand(2, 12);
        const c = P(1, 0, -a * a);
        return mkCard('次の式を展開しなさい。<br>' + lin(1, a) + lin(1, -a), c,
          [P(1, 0, a * a), P(1, -2 * a, a * a), P(1, 0, -2 * a), P(1, 2 * a, -a * a)],
          '(x + a)(x − a) = x' + S2 + ' − a' + S2 + '。中の x の項は消えて、' + c + '。');
      }
      case 3: {
        let p = rand(1, 3), r = rand(1, 3); if (p * r === 1) r = 2;
        const q = rnz(-6, 6), s = rnz(-6, 6);
        const c = P(p * r, p * s + q * r, q * s);
        return mkCard('次の式を展開しなさい。<br>' + lin(p, q) + lin(r, s), c,
          [P(p * r, p * s + q * r, -q * s), P(p * r, q + s, q * s), P(p * r, p * s + q * r, q + s), P(p * r, p * s - q * r, q * s), P(p * r, p * s + q * r + 1, q * s), P(p * r + 1, p * s + q * r, q * s)],
          '分配法則で x' + S2 + ' の係数は ' + p + '×' + r + '＝' + p * r + '、x の係数は ' + p + '×' + mn(s) + ' ＋ ' + mn(q) + '×' + r + ' ＝ ' + mn(p * s + q * r) + '、定数項は ' + mn(q) + '×' + mn(s) + ' ＝ ' + mn(q * s) + '。');
      }
      case 4: {
        const k = pick([2, 3, 4, -1, -2, -3]), a = rnz(-6, 6), b = rnz(-6, 6);
        if (a + b === 0) return genExpand();
        const pre = k === -1 ? '−' : String(k);
        const c = P(k, k * (a + b), k * a * b);
        return mkCard('次の式を展開しなさい。<br>' + pre + lin(1, a) + lin(1, b), c,
          [P(k, k * (a + b), a * b), P(k, a + b, a * b), P(k, k * (a + b), -k * a * b), P(1, k * (a + b), k * a * b)],
          'まず (x + a)(x + b) を展開して x' + S2 + ' + ' + '(' + mn(a + b) + ')x + (' + mn(a * b) + ') を得る。それに全体で ' + mn(k) + ' をかけると ' + c + '。');
      }
      case 5: {
        const p = rand(1, 3), q = rnz(-4, 4);
        const c = expr([[p * p, 'x' + S2], [2 * p * q, 'xy'], [q * q, 'y' + S2]]);
        return mkCard('次の式を展開しなさい。<br>(' + expr([[p, 'x'], [q, 'y']]) + ')' + S2, c,
          [expr([[p * p, 'x' + S2], [q * q, 'y' + S2]]), expr([[p * p, 'x' + S2], [p * q, 'xy'], [q * q, 'y' + S2]]),
           expr([[p * p, 'x' + S2], [2 * p * q, 'xy'], [-q * q, 'y' + S2]]), expr([[p * p, 'x' + S2], [-2 * p * q, 'xy'], [q * q, 'y' + S2]])],
          '(A + B)' + S2 + ' = A' + S2 + ' + 2AB + B' + S2 + ' で A = ' + expr([[p, 'x']]) + '、B = ' + expr([[q, 'y']]) + '。');
      }
      default: {
        const a = rand(2, 4), b = rand(1, 6);
        const c = expr([[a * a, 'x' + S2], [-b * b, '']]);
        return mkCard('次の式を展開しなさい。<br>' + lin(a, b) + lin(a, -b), c,
          [expr([[a * a, 'x' + S2], [b * b, '']]), expr([[a, 'x' + S2], [-b * b, '']]), expr([[a * a, 'x' + S2], [-2 * a * b, 'x'], [b * b, '']]), expr([[a * a, 'x' + S2], [-b, '']])],
          '(A + B)(A − B) = A' + S2 + ' − B' + S2 + ' で A = ' + expr([[a, 'x']]) + '、B = ' + b + '。');
      }
    }
  }

  // ---------- 2. 因数分解 ----------
  function genFactor() {
    const ask = '次の式を因数分解しなさい。<br>';
    switch (rand(0, 6)) {
      case 0: {
        const g = rand(2, 6), p = rand(1, 3);
        let q = rnz(-5, 5); if (g2(p, q) !== 1) q = q > 0 ? q + 1 : q - 1; if (g2(p, q) !== 1) q = 1;
        const c = g + 'x' + lin(p, q);
        return mkCard(ask + expr([[g * p, 'x' + S2], [g * q, 'x']]), c,
          [g + '(' + expr([[p, 'x' + S2], [q, 'x']]) + ')', 'x(' + expr([[g * p, 'x'], [g * q, '']]) + ')', g + 'x' + lin(p, -q), g + 'x' + lin(q, p), g + lin(p, q)],
          '共通因数は ' + g + 'x。' + g + 'x でくくると ' + c + '。（' + g + ' や x だけでくくった形は、まだ共通因数が残っているので不十分）');
      }
      case 1: {
        let a = rnz(-9, 9), b = rnz(-9, 9); if (a === b) b = a > 0 ? a - 1 || 2 : a + 1 || -2; if (a + b === 0) b += 1; if (b === 0) b = 2; if (a === b) b += 3;
        const c = fac(1, a, b);
        return mkCard(ask + P(1, a + b, a * b), c,
          [fac(1, -a, -b), fac(1, a, -b), fac(1, -a, b), fac(1, a + b, 1), fac(1, a * b, 1)],
          '足して ' + mn(a + b) + '、かけて ' + mn(a * b) + ' になる2数は ' + mn(a) + ' と ' + mn(b) + '。よって ' + c + '。');
      }
      case 2: {
        const a = rnz(-9, 9);
        const c = lin(1, a) + S2;
        return mkCard(ask + P(1, 2 * a, a * a), c,
          [lin(1, -a) + S2, lin(1, 2 * a) + S2, lin(1, a * a) + S2, lin(1, a) + lin(1, -a)],
          a * a + ' ＝ ' + Math.abs(a) + '×' + Math.abs(a) + '、中の項 ' + mn(2 * a) + ' ＝ 2×' + mn(a) + ' なので (x + a)' + S2 + ' の形。答えは ' + c + '。');
      }
      case 3: {
        let p = rand(1, 5), q = rand(1, 9); while (g2(p, q) !== 1) q = rand(1, 9);
        const c = lin(p, q) + lin(p, -q);
        return mkCard(ask + expr([[p * p, 'x' + S2], [-q * q, '']]), c,
          [lin(p, -q) + S2, lin(p, q) + S2, lin(p, q * q) + lin(p, -q * q), lin(p * p, q) + lin(p * p, -q), lin(p, q) + lin(p, q), lin(p, q + 1) + lin(p, -q - 1)],
          expr([[p * p, 'x' + S2]]) + ' ＝ (' + expr([[p, 'x']]) + ')' + S2 + '、' + q * q + ' ＝ ' + q + S2 + ' なので A' + S2 + ' − B' + S2 + ' ＝ (A + B)(A − B) の形。');
      }
      case 4: {
        let p = rand(1, 3), r = rand(1, 3); if (p * r === 1) { p = 2; }
        let q, s, tries = 0;
        do { q = rnz(-5, 5); s = rnz(-5, 5); tries++; }
        while (tries < 200 && ((p === r && q === s) || p * s + q * r === 0 || g2(p, q) !== 1 || g2(r, s) !== 1 || g2(g2(p * r, p * s + q * r), q * s) !== 1));
        if (tries >= 200) { p = 2; r = 1; q = 1; s = 3; }
        const f = (p1, q1, r1, s1) => { const A = [p1, q1], B = [r1, s1]; const ord = (A[0] - B[0]) || (A[1] - B[1]); return ord <= 0 ? lin(A[0], A[1]) + lin(B[0], B[1]) : lin(B[0], B[1]) + lin(A[0], A[1]); };
        const c = f(p, q, r, s);
        return mkCard(ask + P(p * r, p * s + q * r, q * s), c,
          [[p, s, r, q], [p, -q, r, -s], [p, q, r, -s], [p, -s, r, q], [p, q * s, r, 1], [p, s + 1, r, q], [p, q, r, s + 1]]
            .filter(w => !(w[0] * w[2] === p * r && w[0] * w[3] + w[1] * w[2] === p * s + q * r && w[1] * w[3] === q * s)).map(w => f(w[0], w[1], w[2], w[3])),
          '「たすき掛け」で ' + (p * r) + '＝' + p + '×' + r + '、' + mn(q * s) + '＝' + mn(q) + '×' + mn(s) + ' の組み合わせのうち、たすき掛けの和が ' + mn(p * s + q * r) + ' になるものを選ぶと ' + c + '。展開して確かめられる。');
      }
      case 5: {
        const k = rand(2, 4);
        let a = rnz(-6, 6), b = rnz(-6, 6); if (a + b === 0) b = b > 0 ? b + 1 : b - 1; if (b === 0) b = 1; if (a === b) return genFactor();
        const c = fac(k, a, b);
        return mkCard(ask + expr([[k, 'x' + S2], [k * (a + b), 'x'], [k * a * b, '']]), c,
          [fac(k, -a, -b), fac(k, a, -b), fac(k, -a, b), fac(k, a + b, 1), fac(1, a * k, b)],
          'まず共通因数 ' + k + ' でくくり ' + k + '(' + P(1, a + b, a * b) + ')。かっこの中は足して ' + mn(a + b) + '、かけて ' + mn(a * b) + ' の2数を探して ' + c + '。');
      }
      default: {
        let p = rand(2, 4), q = rnz(-5, 5); while (g2(p, q) !== 1) q = rnz(-5, 5);
        const c = lin(p, q) + S2;
        return mkCard(ask + expr([[p * p, 'x' + S2], [2 * p * q, 'x'], [q * q, '']]), c,
          [lin(p, -q) + S2, lin(p, 2 * q) + S2, lin(p, q) + lin(p, -q), lin(p, q * q) + S2],
          expr([[p * p, 'x' + S2]]) + ' ＝ (' + expr([[p, 'x']]) + ')' + S2 + '、' + q * q + ' ＝ (' + mn(q) + ')' + S2 + '、中の項は 2×' + expr([[p, 'x']]) + '×' + mn(q) + ' ＝ ' + expr([[2 * p * q, 'x']]) + ' なので、' + c + '。');
      }
    }
  }

  // ---------- 3. 平方根の簡約と加減・乗法 ----------
  function genSqrtA() {
    switch (rand(0, 5)) {
      case 0: {
        const m = pick([2, 3, 5, 6, 7, 10, 11]), k = rand(2, 9);
        const n = k * k * m;
        return mkCard('次の数を、√の中をできるだけ小さい自然数にして表しなさい。<br>' + sqrtHTML(n), R(k, m),
          [isSq(k) ? String(k * m) : R(m, k), R(k * k, m), R(k, m * k), R(k + 1, m), R(k, m + 1)],
          n + ' ＝ ' + k * k + '×' + m + ' ＝ ' + k + S2 + '×' + m + ' だから、' + sqrtHTML(n) + ' ＝ ' + R(k, m) + '。');
      }
      case 1: {
        const m = pick([2, 3, 5, 6, 7]);
        const a = rand(2, 9), b = rand(1, 9), c = rand(1, 9), op = pick(['+', '−']);
        let q, r;
        if (rand(0, 1)) {
          if (op === '−' && a === b) return genSqrtA();
          q = R(a, m) + ' ' + op + ' ' + R(b, m); r = a + (op === '+' ? b : -b);
        } else {
          q = R(a, m) + ' ' + op + ' ' + R(b, m) + ' + ' + R(c, m); r = a + (op === '+' ? b : -b) + c;
        }
        if (r === 0) return genSqrtA();
        return mkCard('次の計算をしなさい。<br>' + q, R(r, m),
          [R(r, m * m), R(r + 1, m), R(r - 1, m), R(1, m * (Math.abs(r) + 1)), r > 0 ? R(r, m + 1) : R(r, m + 2)].filter(x => x !== R(r, m)),
          sqrtHTML(m) + ' を文字のように考え、係数どうしを計算する。答えは ' + R(r, m) + '。（√の中の数はそのまま）');
      }
      case 2: {
        const m = pick([2, 3, 5, 6, 7]);
        const k1 = rand(2, 6); let k2 = rand(1, 6); const op = pick(['+', '−']);
        if (op === '−' && k1 <= k2) k2 = k1 - 1; if (k2 < 1) k2 = 1; if (op === '−' && k1 === k2) return genSqrtA();
        const n1 = k1 * k1 * m, n2 = k2 * k2 * m;
        const r = op === '+' ? k1 + k2 : k1 - k2;
        return mkCard('次の計算をしなさい。<br>' + sqrtHTML(n1) + ' ' + op + ' ' + (k2 === 1 ? sqrtHTML(m) : sqrtHTML(n2)), R(r, m),
          [sqrtHTML(op === '+' ? n1 + n2 : n1 - n2), R(k1 * k2, m), R(r, m * m), R(r + 1, m), R(r - 1, m)].filter(x => x !== R(r, m)),
          '先にそれぞれ簡単にする。' + sqrtHTML(n1) + ' ＝ ' + R(k1, m) + '、' + sqrtHTML(n2) + ' ＝ ' + R(k2, m) + ' なので、' + R(k1, m) + ' ' + op + ' ' + R(k2, m) + ' ＝ ' + R(r, m) + '。');
      }
      case 3: {
        const ms = [2, 3, 5, 6, 7, 10, 15];
        const m = pick(ms); let n = pick(ms); if (n === m) n = pick(ms.filter(x => x !== m));
        const a = rand(1, 4), b = rand(1, 4);
        const [k, s] = simp(m * n);
        const c = a * b * k;
        const ans = R(c, s);
        return mkCard('次の計算をしなさい。<br>' + R(a, m) + ' × ' + R(b, n), ans,
          [R(a * b, m + n), R(a + b, s), R(c + 1, s), R(c, s + 1), String(a * b * m * n)].filter(x => x !== ans),
          '係数どうし（' + a + '×' + b + '）、√の中どうし（' + m + '×' + n + '＝' + m * n + '）をかけて ' + R(a * b, m * n) + '。' + (k > 1 ? 'さらに ' + sqrtHTML(m * n) + ' ＝ ' + R(k, s) + ' と簡単にして ' + ans + '。' : ''));
      }
      case 4: {
        const pairs = [[2, 3], [2, 5], [3, 5], [2, 7], [3, 7], [5, 7], [2, 11], [3, 2], [5, 2], [7, 3]];
        const [a, b] = pick(pairs); const plus = rand(0, 1) === 0;
        const c = plus ? (a + b) + ' + ' + R(2, a * b) : (a + b) + ' − ' + R(2, a * b);
        const w = plus ? (a + b) + ' − ' + R(2, a * b) : (a + b) + ' + ' + R(2, a * b);
        return mkCard('次の式を展開して計算しなさい。<br>(' + sqrtHTML(a) + ' ' + (plus ? '+' : '−') + ' ' + sqrtHTML(b) + ')' + S2, c,
          [w, String(a + b), (a + b) + (plus ? ' + ' : ' − ') + sqrtHTML(a * b), (a + b) + (plus ? ' + ' : ' − ') + R(2, a + b), R(1, a + b)],
          '(A ' + (plus ? '+' : '−') + ' B)' + S2 + ' ＝ A' + S2 + (plus ? ' + ' : ' − ') + '2AB + B' + S2 + '。' + '(' + sqrtHTML(a) + ')' + S2 + ' ＝ ' + a + '、(' + sqrtHTML(b) + ')' + S2 + ' ＝ ' + b + '、2AB ＝ ' + R(2, a * b) + ' なので ' + c + '。');
      }
      default: {
        const m = pick([2, 3, 5, 6, 7]);
        const k = rand(2, 5), l = rand(2, 5);
        const n = k * k * m;
        const ans = k * m;
        return T('√' + n + ' × √' + m + ' の値を求めなさい。', '√' + n + ' ＝ ' + k + '√' + m + ' だから、' + k + '√' + m + ' × √' + m + ' ＝ ' + k + '×' + m + ' ＝ ' + ans + '。', ans);
      }
    }
  }

  // ---------- 4. 平方根の乗除・有理化・式の値 ----------
  function genSqrtB() {
    switch (rand(0, 6)) {
      case 0: {
        const m = pick([2, 3, 5, 6, 7, 10]);
        let a = rand(1, 12); if (a === m) a += 1;
        const ans = rf(a, m, m);
        return mkCard('次の数の分母を有理化しなさい。<br>' + fracHTMLRaw(a, sqrtHTML(m)), ans,
          [R(a, m), fracHTML(a, m), rf(a + 1, m, m), rf(a, m, m * m), rf(a, m, 2 * m)].filter(x => x !== ans),
          '分母と分子に ' + sqrtHTML(m) + ' をかけると、分母は ' + sqrtHTML(m) + '×' + sqrtHTML(m) + ' ＝ ' + m + '、分子は ' + R(a, m) + '。約分できるときは約分して ' + ans + '。');
      }
      case 1: {
        const b = pick([2, 3, 5, 6, 7]), k = rand(2, 7);
        return T('√' + (b * k * k) + ' ÷ √' + b + ' の値を求めなさい。', '√' + (b * k * k) + ' ÷ √' + b + ' ＝ √(' + (b * k * k) + '÷' + b + ') ＝ √' + (k * k) + ' ＝ ' + k + '。', k);
      }
      case 2: {
        const m = pick([3, 5, 6, 7, 10, 11, 13]), k = rand(1, 5);
        const ans = m - k * k;
        return T('(√' + m + ' + ' + k + ')(√' + m + ' − ' + k + ') の値を求めなさい。', '(A + B)(A − B) ＝ A' + '²' + ' − B' + '²' + ' より、' + m + ' − ' + (k * k) + ' ＝ ' + mn(ans) + '。', ans);
      }
      case 3: {
        const m = pick([2, 3, 5, 6, 7]), k = rand(1, 5);
        if (rand(0, 1)) {
          const ans = 2 * m + 2 * k * k;
          return T('x = √' + m + ' + ' + k + '、y = √' + m + ' − ' + k + ' のとき、x² + y² の値を求めなさい。', 'x² ＝ ' + m + ' + ' + 2 * k + '√' + m + ' + ' + k * k + '、y² ＝ ' + m + ' − ' + 2 * k + '√' + m + ' + ' + k * k + '。足すと √ の項が消えて ' + ans + '。', ans);
        }
        const ans = 4 * m;
        return T('x = √' + m + ' + ' + k + '、y = √' + m + ' − ' + k + ' のとき、(x + y)² の値を求めなさい。', 'x + y ＝ 2√' + m + ' なので、(x + y)² ＝ 4×' + m + ' ＝ ' + ans + '。', ans);
      }
      case 4: {
        let n = rand(2, 200); while (isSq(n)) n = rand(2, 200);
        const ans = Math.floor(Math.sqrt(n));
        return T('√' + n + ' の整数部分を求めなさい。', ans + '² ＝ ' + ans * ans + ' ＜ ' + n + ' ＜ ' + (ans + 1) * (ans + 1) + ' ＝ ' + (ans + 1) + '² なので、' + ans + ' ＜ √' + n + ' ＜ ' + (ans + 1) + '。整数部分は ' + ans + '。', ans);
      }
      case 5: {
        const s = pick([2, 3, 5, 6, 7, 10, 11]), k = rand(2, 6);
        const m = k * k * s;
        return T('√(' + m + 'n) が整数になるような最も小さい自然数 n を求めなさい。', m + ' ＝ ' + k + '²×' + s + '。√ の中が平方数になるには ' + s + ' をかければよいので、n ＝ ' + s + '。', s);
      }
      default: {
        const m = pick([2, 3, 5, 6, 7]);
        const k = rand(2, 5), j = rand(2, 4);
        const ans = k * j;
        return T('√' + (k * k * m) + ' × √' + (j * j * m) + ' ÷ √' + (m * m) + ' の値を求めなさい。', '√' + (k * k * m) + ' ＝ ' + k + '√' + m + '、√' + (j * j * m) + ' ＝ ' + j + '√' + m + '、√' + (m * m) + ' ＝ ' + m + '。よって ' + k + '×' + j + '×' + m + ' ÷ ' + m + ' ＝ ' + ans + '。', ans);
      }
    }
  }

  // ---------- 5. 二次方程式 ----------
  function quad(b, k, s, den) {
    const g = g2(g2(b, k), den); b /= g; k /= g; den /= g;
    const lead = b === 0 ? '' : mn(b);
    const rt = (k === 1 ? '' : k) + sqrtHTML(s);
    const num = lead === '' ? '± ' + rt : lead + ' ± ' + rt;
    return 'x = ' + (den === 1 ? num : fracHTMLRaw(num, den));
  }
  function genQuad() {
    switch (rand(0, 6)) {
      case 0: {
        const r1 = rnz(-9, 9); let r2 = rnz(-9, 9); if (rand(0, 9) === 0) r2 = r1;
        const eq = P(1, -(r1 + r2), r1 * r2) + ' = 0';
        const c = roots([r1, r2]);
        return mkCard('次の二次方程式を解きなさい。<br>' + eq, c,
          [roots([-r1, -r2]), roots([r1, -r2]), roots([-r1, r2]), roots([r1 + 1, r2 + 1]), roots([r1 + r2, r1 * r2])],
          '左辺を因数分解すると (x ' + (r1 > 0 ? '− ' : '+ ') + Math.abs(r1) + ')(x ' + (r2 > 0 ? '− ' : '+ ') + Math.abs(r2) + ') ＝ 0。よって ' + c + '。（かっこの中の符号と解の符号は逆）');
      }
      case 1: {
        const r1 = rnz(-8, 8); const r2 = rnz(-8, 8);
        if (r1 + r2 === 0) return genQuad();
        const b = -(r1 + r2), c0 = -(r1 * r2);
        const c = roots([r1, r2]);
        return mkCard('次の二次方程式を解きなさい。<br>' + expr([[1, 'x' + S2], [b, 'x']]) + ' = ' + mn(c0), c,
          [roots([-r1, -r2]), roots([r1, -r2]), roots([-r1, r2]), roots([r1 + 1, r2 - 1])],
          '右辺を左辺に移項して ' + P(1, b, -c0) + ' ＝ 0。因数分解して解くと ' + c + '。');
      }
      case 2: {
        const a = rnz(-8, 8), k = rand(1, 7);
        const c = roots([-a - k, -a + k]);
        return mkCard('次の二次方程式を解きなさい。<br>' + lin(1, a) + S2 + ' = ' + k * k, c,
          [roots([a - k, a + k]), roots([-a + k]), roots([-a - k, -a + k].map(v => v + 1)), roots([-a + k * k, -a - k * k]), roots([-a - k])],
          'x ' + (a > 0 ? '+ ' : '− ') + Math.abs(a) + ' ＝ ±' + k + ' だから x ＝ ' + mn(-a) + ' ± ' + k + '。よって ' + c + '。');
      }
      case 3: {
        const k = rand(2, 12);
        const c = roots([-k, k]);
        return mkCard('次の二次方程式を解きなさい。<br>' + expr([[1, 'x' + S2], [-k * k, '']]) + ' = 0', c,
          [roots([k]), roots([-k]), roots([k * k, -k * k]), roots([-k, k].map(v => v * 2)), roots([k - 1, 1 - k, k + 1])].filter(x => x !== c),
          'x' + S2 + ' ＝ ' + k * k + ' より、x ＝ ±' + k + '。正の解と負の解の2つがある。');
      }
      case 4: {
        const a = rand(1, 3), b = rand(-7, 7); let c = rnz(-6, 6);
        const D = b * b - 4 * a * c;
        if (D <= 0 || isSq(D)) return genQuad();
        const [k, s] = simp(D);
        const ans = quad(-b, k, s, 2 * a);
        const wrongs = [quad(b, k, s, 2 * a), quad(-b, k, s, a), quad(-b, k, s, 4 * a), quad(-b, k + 1, s, 2 * a), quad(-b, k, s, 2)];
        const D2 = b * b + 4 * a * c;
        if (D2 > 0 && !isSq(D2)) { const [k2, s2] = simp(D2); wrongs.push(quad(-b, k2, s2, 2 * a)); }
        return mkCard('次の二次方程式を解きなさい。<br>' + expr([[a, 'x' + S2], [b, 'x'], [c, '']]) + ' = 0', ans, wrongs.filter(x => x !== ans),
          '解の公式 x ＝ (−b ± √(b² − 4ac)) ÷ 2a に a＝' + a + '、b＝' + mn(b) + '、c＝' + mn(c) + ' を入れると、b² − 4ac ＝ ' + D + (k > 1 ? ' ＝ ' + k + '²×' + s : '') + '。よって ' + ans + '。');
      }
      case 5: {
        if (rand(0, 1)) {
          const h = rand(1, 6), c0 = rand(-5, 9);
          const bb = 2 * h;
          const q = h * h - c0;
          if (q <= 0) return genQuad();
          return T('二次方程式 ' + P(1, bb, c0).replace(/<sup>2<\/sup>/g, '²') + ' = 0 を (x + p)² = q の形に変形したとき、q の値を求めなさい。',
            'x² + ' + bb + 'x の部分を平方完成する。' + h + '² ＝ ' + h * h + ' を両辺に足すと (x + ' + h + ')² ＝ ' + h * h + ' − (' + mn(c0) + ') ＝ ' + q + '。よって q ＝ ' + q + '。', q);
        }
        const h = rand(1, 6), c0 = rand(-5, 9);
        if (h * h - c0 <= 0) return genQuad();
        return T('二次方程式 ' + P(1, -2 * h, c0).replace(/<sup>2<\/sup>/g, '²') + ' = 0 を (x + p)² = q の形に変形したとき、p の値を求めなさい。', 'x² − ' + 2 * h + 'x の部分は (x − ' + h + ')² ＝ x² − ' + 2 * h + 'x + ' + h * h + ' の形なので、p ＝ ' + mn(-h) + '。', -h);
      }
      default: {
        const t = rand(0, 2);
        if (t === 0) {
          const m = rand(2, 12);
          return T('連続する2つの自然数の積が ' + m * (m + 1) + ' です。小さい方の自然数を求めなさい。', '小さい方を x とすると x(x + 1) ＝ ' + m * (m + 1) + '。x² + x − ' + m * (m + 1) + ' ＝ 0 を解くと x ＝ ' + m + ' または ' + mn(-(m + 1)) + '。自然数だから ' + m + '。', m);
        }
        if (t === 1) {
          const x = rand(2, 9), d = rand(2, 5);
          return T('縦が横より ' + d + ' cm 短い長方形があり、面積は ' + x * (x + d) + ' cm² です。縦の長さを求めなさい。', '縦を x cm とすると横は (x + ' + d + ') cm。x(x + ' + d + ') ＝ ' + x * (x + d) + ' を解くと x ＝ ' + x + ' または ' + mn(-(x + d)) + '。長さは正だから ' + x + ' cm。', x, 'cm');
        }
        const r1 = rand(2, 9), r2 = rnz(-8, -1);
        const p = r1 + r2, q = -r1 * r2;
        if (p < 1) return genQuad();
        return T('正の整数 x について、x² ＝ ' + (p === 1 ? '' : p) + 'x + ' + q + ' が成り立ちます。x の値を求めなさい。', 'x² − ' + (p === 1 ? '' : p) + 'x − ' + q + ' ＝ 0 を因数分解すると (x − ' + r1 + ')(x + ' + (-r2) + ') ＝ 0。x ＝ ' + r1 + ' または ' + mn(r2) + ' で、正の整数は ' + r1 + '。', r1);
      }
    }
  }

  // ---------- 6. 関数 y = ax² ----------
  function rng(lo, hi) { return mn(lo) + ' ≦ y ≦ ' + mn(hi); }
  function genFunc() {
    switch (rand(0, 5)) {
      case 0: {
        const a = pick([1, 2, 3, 4, 5, -1, -2, -3, -4]), x = rnz(-6, 6);
        return T('y は x の2乗に比例し、式は y = ' + (a === 1 ? '' : (a === -1 ? '−' : mn(a))) + 'x² です。x = ' + mn(x) + ' のとき、y の値を求めなさい。', 'x に ' + mn(x) + ' を代入する。x² ＝ ' + x * x + ' なので y ＝ ' + mn(a) + '×' + x * x + ' ＝ ' + mn(a * x * x) + '。', a * x * x);
      }
      case 1: {
        const a = pick([1, 2, 3, 4, -1, -2, -3]), t = rnz(-5, 5);
        return T('y = ax² のグラフが点 (' + mn(t) + ', ' + mn(a * t * t) + ') を通るとき、a の値を求めなさい。', 'x ＝ ' + mn(t) + '、y ＝ ' + mn(a * t * t) + ' を代入すると ' + mn(a * t * t) + ' ＝ a×' + t * t + '。よって a ＝ ' + mn(a) + '。', a);
      }
      case 2: {
        const n = pick([1, 2, 3, 4, -1, -2, -3]), d = pick([2, 3]);
        if (g2(n, d) !== 1) return genFunc();
        const u = rand(1, 3), t = d * u * pick([1, -1]), s = n * d * u * u;
        return mkCard('y = ax² のグラフが点 (' + mn(t) + ', ' + mn(s) + ') を通るとき、a の値を求めなさい。', frs(n, d),
          [frs(s, t), frs(t * t, s), frs(-n, d), frs(2 * n, d), frs(n, 2 * d)],
          'x ＝ ' + mn(t) + '、y ＝ ' + mn(s) + ' を代入して ' + mn(s) + ' ＝ a×' + t * t + '。a ＝ ' + mn(s) + '÷' + t * t + ' ＝ ' + frs(n, d) + '。（x² ＝ ' + t * t + ' であって、x の値そのものではない）');
      }
      case 3: {
        const a = pick([1, 2, 3, -1, -2, -3]);
        let p = rnz(-5, 5), q = rnz(-5, 5); if (p === q) return genFunc();
        if (p > q) { const tmp = p; p = q; q = tmp; }
        const A = a * p * p, B = a * q * q;
        const span = p < 0 && q > 0;
        const lo = span ? (a > 0 ? 0 : Math.min(A, B)) : Math.min(A, B);
        const hi = span ? (a > 0 ? Math.max(A, B) : 0) : Math.max(A, B);
        const correct = rng(lo, hi);
        const wr = [rng(Math.min(A, B), Math.max(A, B)), rng(Math.min(a * p, a * q), Math.max(a * p, a * q)), rng(-hi, -lo)];
        if (span) { wr.push(rng(-Math.max(Math.abs(A), Math.abs(B)), Math.max(Math.abs(A), Math.abs(B)))); wr.push(rng(Math.min(A, B, 0) === 0 ? 0 : Math.min(A, B, 0), Math.max(A, B, 0)) ); wr.push(rng(Math.min(a * p * p, a * q * q) + 1, Math.max(A, B) + 1)); }
        else { wr.push(rng(0, Math.max(A, B) * (a > 0 ? 1 : 0))); wr.push(rng(Math.min(A, B, 0), Math.max(A, B, 0))); }
        wr.push(rng(lo - 1, hi), rng(lo, hi + 1), rng(lo * 2, hi * 2));
        return mkCard('関数 y = ' + (a === 1 ? '' : (a === -1 ? '−' : mn(a))) + 'x' + S2 + ' で、x の変域が ' + mn(p) + ' ≦ x ≦ ' + mn(q) + ' のとき、y の変域を求めなさい。', correct, wr.filter(x => { const t = x.split(' ≦ y ≦ '); return x !== correct && t[0] !== t[1]; }),
          span ? 'x の変域に 0 をふくむので、y は x ＝ 0 のとき ' + (a > 0 ? '最小値 0' : '最大値 0') + '。端の値は x ＝ ' + mn(p) + ' で y ＝ ' + mn(A) + '、x ＝ ' + q + ' で y ＝ ' + mn(B) + ' だから ' + correct + '。'
               : 'x の変域に 0 をふくまないので、両端の値の間になる。x ＝ ' + mn(p) + ' で y ＝ ' + mn(A) + '、x ＝ ' + mn(q) + ' で y ＝ ' + mn(B) + ' だから ' + correct + '。');
      }
      case 4: {
        const a = pick([1, 2, 3, 4, -1, -2, -3]);
        let p = rand(-4, 5), q = rand(-4, 6); if (q <= p || p + q === 0) return genFunc();
        return T('関数 y = ' + (a === 1 ? '' : (a === -1 ? '−' : mn(a))) + 'x² で、x が ' + mn(p) + ' から ' + mn(q) + ' まで増加するときの変化の割合を求めなさい。', '変化の割合 ＝ (y の増加量)÷(x の増加量) ＝ a(p + q) の関係が成り立つ。' + mn(a) + '×(' + mn(p) + ' + ' + mn(q) + ') ＝ ' + mn(a * (p + q)) + '。', a * (p + q));
      }
      default: {
        if (rand(0, 1)) {
          const a = pick([1, 2, 3, 4, -1, -2, -3]); let x1 = rand(1, 5), y1 = rand(1, 6);
          let x = rnz(-4, 4); if (x === x1) x = x1 === 1 ? 2 : x1 - 1;
          return T('y は x の2乗に比例し、x = ' + x1 + ' のとき y = ' + mn(a * x1 * x1) + ' です。x = ' + mn(x) + ' のとき、y の値を求めなさい。', 'y ＝ ax² に x ＝ ' + x1 + '、y ＝ ' + mn(a * x1 * x1) + ' を入れて a ＝ ' + mn(a) + '。y ＝ ' + mn(a) + 'x² に x ＝ ' + mn(x) + ' を入れて y ＝ ' + mn(a * x * x) + '。', a * x * x);
        }
        const a = pick([1, 2, 3, 4, -1, -2, -3]), p = rand(0, 4), q = p + rand(1, 4);
        return T('関数 y = ' + (a === 1 ? '' : (a === -1 ? '−' : mn(a))) + 'x² で、x が ' + p + ' から ' + q + ' まで増加するとき、y の増加量を求めなさい。', 'x ＝ ' + p + ' のとき y ＝ ' + mn(a * p * p) + '、x ＝ ' + q + ' のとき y ＝ ' + mn(a * q * q) + '。増加量は ' + mn(a * q * q) + ' − (' + mn(a * p * p) + ') ＝ ' + mn(a * (q * q - p * p)) + '。', a * (q * q - p * p));
      }
    }
  }

  // ---------- 7. 三平方の定理 ----------
  function genPyth() {
    switch (rand(0, 8)) {
      case 0: {
        const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]); const k = pick([1, 1, 2, 3]);
        return T('直角をはさむ2辺の長さが ' + a * k + ' cm と ' + b * k + ' cm の直角三角形の、斜辺の長さを求めなさい。', (a * k) + '² + ' + (b * k) + '² ＝ ' + (a * a + b * b) * k * k + ' ＝ ' + c * k + '² なので、斜辺は ' + c * k + ' cm。', c * k, 'cm');
      }
      case 1: {
        const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]); const k = pick([1, 1, 2, 3]);
        const leg = pick([a, b]), other = leg === a ? b : a;
        return T('斜辺の長さが ' + c * k + ' cm、他の1辺が ' + leg * k + ' cm の直角三角形で、残りの1辺の長さを求めなさい。', '残りの辺を x cm とすると x² ＝ ' + (c * k) + '² − ' + (leg * k) + '² ＝ ' + (c * c - leg * leg) * k * k + ' ＝ ' + other * k + '²。x ＝ ' + other * k + '。', other * k, 'cm');
      }
      case 2: {
        const a = rand(2, 9), b = rand(2, 9); if (a === b || isSq(a * a + b * b)) return genPyth();
        const S = a * a + b * b;
        const ans = RS(S);
        return mkCard('直角をはさむ2辺の長さが ' + a + ' cm と ' + b + ' cm の直角三角形の、斜辺の長さを求めなさい。（cm）', ans,
          [RS(Math.abs(a * a - b * b)), String(a + b), RS(a + b), RS(a * b)].filter(x => x !== ans),
          '斜辺を c cm とすると c² ＝ ' + a + '² + ' + b + '² ＝ ' + S + '。c ＞ 0 だから c ＝ ' + sqrtHTML(S) + (simp(S)[0] > 1 ? ' ＝ ' + ans : '') + '。');
      }
      case 3: {
        const c = rand(5, 14), a = rand(2, c - 1); const S = c * c - a * a;
        if (isSq(S)) return genPyth();
        const ans = RS(S);
        return mkCard('斜辺が ' + c + ' cm、他の1辺が ' + a + ' cm の直角三角形で、残りの1辺の長さを求めなさい。（cm）', ans,
          [RS(c * c + a * a), String(c - a), RS(c - a), RS(c * a)].filter(x => x !== ans),
          '残りの辺を x cm とすると x² ＋ ' + a + '² ＝ ' + c + '²。x² ＝ ' + c * c + ' − ' + a * a + ' ＝ ' + S + '。x ＝ ' + sqrtHTML(S) + (simp(S)[0] > 1 ? ' ＝ ' + ans : '') + '。');
      }
      case 4: {
        const t = rand(0, 4);
        if (t === 0) { const a = rand(2, 12);
          return mkCard('等しい2辺の長さが ' + a + ' cm の直角二等辺三角形の、斜辺の長さを求めなさい。（cm）', R(a, 2),
            [String(2 * a), R(a, 3), R(2 * a, 2), String(a), R(a * a, 2)], '直角二等辺三角形の辺の比は 1 : 1 : √2。斜辺は ' + R(a, 2) + ' cm。'); }
        if (t === 1) { const c = 2 * rand(2, 9);
          return mkCard('斜辺の長さが ' + c + ' cm の直角二等辺三角形の、等しい2辺の長さを求めなさい。（cm）', R(c / 2, 2),
            [R(c, 2), String(c / 2), R(c / 2, 3), R(2 * c, 2)], '辺の比 1 : 1 : √2 より、等しい辺は 斜辺÷√2 ＝ ' + c + ' ÷ √2 ＝ ' + c + '√2 ÷ 2 ＝ ' + R(c / 2, 2) + ' cm。'); }
        if (t === 2) { const n = rand(2, 12);
          return T('3つの角が 30°、60°、90° の直角三角形で、最も短い辺の長さが ' + n + ' cm のとき、斜辺の長さを求めなさい。', '辺の比は 1 : √3 : 2。最も短い辺が ' + n + ' なので斜辺は 2×' + n + ' ＝ ' + 2 * n + ' cm。', 2 * n, 'cm'); }
        if (t === 3) { const n = rand(2, 12);
          return mkCard('3つの角が 30°、60°、90° の直角三角形で、斜辺の長さが ' + 2 * n + ' cm のとき、残りの2辺のうち長い方の長さを求めなさい。（cm）', R(n, 3),
            [R(n, 2), String(n), R(2 * n, 3), R(n * n, 3)], '辺の比は 1 : √3 : 2。斜辺 ' + 2 * n + ' の半分の ' + n + ' が最も短い辺で、長い方は ' + R(n, 3) + ' cm。'); }
        const a = 2 * rand(1, 6);
        return mkCard('1辺の長さが ' + a + ' cm の正三角形の、高さを求めなさい。（cm）', R(a / 2, 3),
          [R(a, 3), R(a / 2, 2), String(a / 2), R(a, 2)], '正三角形を半分にすると 30°、60°、90° の直角三角形（辺の比 1 : √3 : 2）。底辺の半分 ' + a / 2 + ' cm が短い辺なので、高さは ' + R(a / 2, 3) + ' cm。');
      }
      case 5: {
        let dx, dy;
        if (rand(0, 1)) { [dx, dy] = pick([[3, 4], [4, 3], [5, 12], [12, 5], [6, 8], [8, 6]]); }
        else { dx = rand(1, 8); dy = rand(1, 8); }
        dx *= pick([1, -1]); dy *= pick([1, -1]);
        const x1 = rand(-4, 4), y1 = rand(-4, 4), x2 = x1 + dx, y2 = y1 + dy;
        const S = dx * dx + dy * dy;
        const ask = '座標平面上の2点 A(' + mn(x1) + ', ' + mn(y1) + ')、B(' + mn(x2) + ', ' + mn(y2) + ') の間の距離 AB を求めなさい。';
        const ex = 'x座標の差は ' + Math.abs(dx) + '、y座標の差は ' + Math.abs(dy) + '。AB' + '² ＝ ' + dx * dx + ' + ' + dy * dy + ' ＝ ' + S + '。';
        if (isSq(S)) return T(ask, ex + 'AB ＝ ' + Math.sqrt(S) + '。', Math.sqrt(S));
        const ans = RS(S);
        return mkCard(ask, ans, [RS(Math.abs(dx * dx - dy * dy) || S + 1), String(Math.abs(dx) + Math.abs(dy)), RS(Math.abs(dx) + Math.abs(dy)), RS(Math.abs(dx * dy))].filter(x => x !== ans),
          ex + 'AB ＝ ' + sqrtHTML(S) + (simp(S)[0] > 1 ? ' ＝ ' + ans : '') + '。');
      }
      case 6: {
        const [a, b, c] = pick([[1, 2, 2], [2, 3, 6], [2, 4, 4], [1, 4, 8], [4, 4, 7], [2, 10, 11], [6, 6, 7], [3, 4, 12]]);
        const d = Math.sqrt(a * a + b * b + c * c);
        return T('縦 ' + a + ' cm、横 ' + b + ' cm、高さ ' + c + ' cm の直方体の、対角線の長さを求めなさい。', '対角線の長さは √(' + a + '² + ' + b + '² + ' + c + '²) ＝ √' + d * d + ' ＝ ' + d + ' cm。', d, 'cm');
      }
      case 7: {
        const [r, dd] = pick([[5, 3], [5, 4], [13, 5], [13, 12], [10, 6], [10, 8], [25, 7], [17, 8], [17, 15]]);
        const h = Math.sqrt(r * r - dd * dd);
        return T('半径 ' + r + ' cm の円で、中心からの距離が ' + dd + ' cm である弦の長さを求めなさい。', '中心から弦に垂線を引くと弦の中点を通る。半径 ' + r + ' を斜辺とする直角三角形で、半弦の長さは √(' + r + '² − ' + dd + '²) ＝ ' + h + '。弦の長さはその2倍で ' + 2 * h + ' cm。', 2 * h, 'cm');
      }
      default: {
        const a = rand(2, 12);
        return T('1辺の長さが ' + a + ' cm の正方形の対角線の長さの2乗を求めなさい。', '対角線を d cm とすると d² ＝ ' + a + '² + ' + a + '² ＝ ' + 2 * a * a + '。', 2 * a * a);
      }
    }
  }

  // ---------- 8. 相似 ----------
  function genSimilar() {
    const cop = () => { let m, n; do { m = rand(2, 7); n = rand(2, 7); } while (m === n || g2(m, n) !== 1); return [m, n]; };
    switch (rand(0, 8)) {
      case 0: {
        const [m, n] = cop();
        return mkCard('相似比が ' + m + ' : ' + n + ' の2つの図形の、面積比を求めなさい。', m * m + ' : ' + n * n,
          [m + ' : ' + n, m * m * m + ' : ' + n * n * n, m * m + ' : ' + n, m + ' : ' + n * n],
          '面積比は相似比の2乗。' + m + '² : ' + n + '² ＝ ' + m * m + ' : ' + n * n + '。');
      }
      case 1: {
        const [m, n] = cop();
        return mkCard('相似比が ' + m + ' : ' + n + ' の2つの立体の、体積比を求めなさい。', m * m * m + ' : ' + n * n * n,
          [m + ' : ' + n, m * m + ' : ' + n * n, m * m * m + ' : ' + n, m * m * m + ' : ' + n * n], '体積比は相似比の3乗。' + m + '³ : ' + n + '³ ＝ ' + m * m * m + ' : ' + n * n * n + '。');
      }
      case 2: {
        const [m, n] = cop();
        return mkCard('2つの相似な図形の面積比が ' + m * m + ' : ' + n * n + ' のとき、相似比を求めなさい。', m + ' : ' + n,
          [m * m + ' : ' + n * n, m * m * m + ' : ' + n * n * n, m * 2 + ' : ' + n * 3, m * m + ' : ' + n],
          '面積比は相似比の2乗なので、相似比は面積比の平方根。√' + m * m + ' : √' + n * n + ' ＝ ' + m + ' : ' + n + '。');
      }
      case 3: {
        const [m, n] = cop();
        return mkCard('2つの相似な立体の体積比が ' + m * m * m + ' : ' + n * n * n + ' のとき、表面積の比を求めなさい。', m * m + ' : ' + n * n,
          [m + ' : ' + n, m * m * m + ' : ' + n * n * n, m * m + ' : ' + n, m + ' : ' + n * n],
          '体積比が相似比の3乗（' + m + '³ : ' + n + '³）だから、相似比は ' + m + ' : ' + n + '。表面積の比は相似比の2乗で ' + m * m + ' : ' + n * n + '。');
      }
      case 4: {
        const [m, n] = cop(); const k = rand(1, 6); const S1 = m * m * k;
        return T('相似な2つの三角形 △ABC と △DEF の相似比は ' + m + ' : ' + n + ' で、△ABC の面積は ' + S1 + ' cm² です。△DEF の面積を求めなさい。', '面積比は ' + m * m + ' : ' + n * n + '。△ABC が ' + m * m + '×' + k + ' なので △DEF は ' + n * n + '×' + k + ' ＝ ' + n * n * k + ' cm²。', n * n * k, 'cm²');
      }
      case 5: {
        const [m, n] = cop(); const k = rand(1, 5); const V1 = m * m * m * k;
        return T('相似な2つの立体 P と Q の相似比は ' + m + ' : ' + n + ' で、P の体積は ' + V1 + ' cm³ です。Q の体積を求めなさい。', '体積比は ' + m * m * m + ' : ' + n * n * n + '。P が ' + m * m * m + '×' + k + ' なので Q は ' + n * n * n + '×' + k + ' ＝ ' + n * n * n * k + ' cm³。', n * n * n * k, 'cm³');
      }
      case 6: {
        const [m, n] = cop(); const k = rand(1, 5), j = rand(1, 5);
        return T('△ABC ∽ △DEF で、AB = ' + m * k + ' cm、DE = ' + n * k + ' cm、BC = ' + m * j + ' cm のとき、EF の長さを求めなさい。', '相似比は AB : DE ＝ ' + m * k + ' : ' + n * k + (k > 1 ? ' ＝ ' + m + ' : ' + n : '') + '。BC : EF ＝ ' + m + ' : ' + n + ' だから EF ＝ ' + m * j + '×' + n + '÷' + m + ' ＝ ' + n * j + ' cm。', n * j, 'cm');
      }
      case 7: {
        const t = rand(0, 3);
        if (t === 0) { const a = rand(1, 6), b = rand(1, 6), k = rand(1, 5);
          return T('△ABC で、辺 AB 上に点 D、辺 AC 上に点 E があり、DE // BC です。AD = ' + a + ' cm、DB = ' + b + ' cm、BC = ' + (a + b) * k + ' cm のとき、DE の長さを求めなさい。', '△ADE ∽ △ABC で相似比は AD : AB ＝ ' + a + ' : ' + (a + b) + '。DE ＝ ' + (a + b) * k + '×' + a + '÷' + (a + b) + ' ＝ ' + a * k + ' cm。', a * k, 'cm'); }
        if (t === 1) { const a = rand(1, 6), b = rand(1, 6), k = rand(1, 5);
          return T('△ABC で、辺 AB 上に点 D、辺 AC 上に点 E があり、DE // BC です。AD = ' + a + ' cm、DB = ' + b + ' cm、AE = ' + a * k + ' cm のとき、EC の長さを求めなさい。', 'AD : DB ＝ AE : EC だから ' + a + ' : ' + b + ' ＝ ' + a * k + ' : EC。EC ＝ ' + b * k + ' cm。', b * k, 'cm'); }
        if (t === 2) { const k = rand(2, 12);
          return T('△ABC の辺 AB、AC の中点をそれぞれ M、N とします。BC = ' + 2 * k + ' cm のとき、MN の長さを求めなさい。', '中点連結定理より MN // BC で MN ＝ BC の半分。' + 2 * k + '÷2 ＝ ' + k + ' cm。', k, 'cm'); }
        const c = rand(2, 6), b = rand(2, 6); if (b === c) return genSimilar();
        const tt = rand(1, 3);
        return T('△ABC で、∠A の二等分線が辺 BC と交わる点を D とします。AB = ' + c + ' cm、AC = ' + b + ' cm、BC = ' + (b + c) * tt + ' cm のとき、BD の長さを求めなさい。', '角の二等分線の性質より BD : DC ＝ AB : AC ＝ ' + c + ' : ' + b + '。BC を ' + c + ' : ' + b + ' に分けるので BD ＝ ' + (b + c) * tt + '×' + c + '÷' + (b + c) + ' ＝ ' + c * tt + ' cm。', c * tt, 'cm');
      }
      default: {
        if (rand(0, 1)) {
          const s = pick([5000, 10000, 20000, 25000, 50000]), L = rand(2, 9);
          return T('縮尺が 1 : ' + s + ' の地図上で ' + L + ' cm の長さは、実際には何 m ですか。', '実際の長さは ' + L + '×' + s + ' ＝ ' + L * s + ' cm ＝ ' + L * s / 100 + ' m。', L * s / 100, 'm');
        }
        const [m, n] = cop(); const k = rand(1, 6);
        return T('ある時刻に、高さ ' + m * 50 + ' cm の棒の影の長さが ' + n * 50 + ' cm でした。同じ時刻に、木の影の長さが ' + n * 50 * k + ' cm のとき、木の高さは何 cm ですか。', '棒と木は相似な直角三角形をつくる。高さ : 影 ＝ ' + m + ' : ' + n + ' で一定なので、木の高さは ' + n * 50 * k + '×' + m + '÷' + n + ' ＝ ' + m * 50 * k + ' cm。', m * 50 * k, 'cm');
      }
    }
  }

  // ---------- 9. 円周角の定理と角度 ----------
  function genCircle() {
    switch (rand(0, 7)) {
      case 0: { const a = rand(10, 85) * 2;
        return T('円 O の弧 AB に対する中心角 ∠AOB が ' + a + '° のとき、その弧 AB 上にない円周上の点 C をとると、円周角 ∠ACB は何度ですか。', '円周角は同じ弧に対する中心角の半分。' + a + '÷2 ＝ ' + a / 2 + '°。', a / 2, '°'); }
      case 1: { const a = rand(10, 89);
        return T('円 O の円周上の3点 A、B、C について、弧 AB に対する円周角 ∠ACB が ' + a + '° のとき、同じ弧に対する中心角 ∠AOB は何度ですか。（∠AOB は 180° より小さい）'.replace('（∠AOB は 180° より小さい）', ''), '中心角は同じ弧に対する円周角の2倍。' + a + '×2 ＝ ' + 2 * a + '°。', 2 * a, '°'); }
      case 2: { const a = rand(15, 80);
        return T('円周上に4点 A、B、C、D があり、C と D は直線 AB について同じ側にあります。∠ACB = ' + a + '° のとき、∠ADB は何度ですか。', '同じ弧 AB に対する円周角は等しいので、∠ADB ＝ ∠ACB ＝ ' + a + '°。', a, '°'); }
      case 3: { const a = rand(15, 75);
        return T('線分 AB が円の直径で、点 C は円周上の A、B と異なる点です。∠CAB = ' + a + '° のとき、∠ABC は何度ですか。', '直径に対する円周角は 90° なので ∠ACB ＝ 90°。△ABC の内角の和は 180° だから ∠ABC ＝ 180 − 90 − ' + a + ' ＝ ' + (90 - a) + '°。', 90 - a, '°'); }
      case 4: { const a = rand(50, 130);
        return T('四角形 ABCD は円に内接しています。∠A = ' + a + '° のとき、∠C は何度ですか。', '円に内接する四角形の対角の和は 180°。∠C ＝ 180 − ' + a + ' ＝ ' + (180 - a) + '°。', 180 - a, '°'); }
      case 5: { const a = rand(50, 130), b = rand(50, 130);
        return T('四角形 ABCD は円に内接しています。∠A = ' + a + '°、∠B = ' + b + '° のとき、∠D は何度ですか。', '∠D の対角は ∠B。対角の和は 180° なので ∠D ＝ 180 − ' + b + ' ＝ ' + (180 - b) + '°。（∠A は関係ない）', 180 - b, '°'); }
      case 6: { const n = pick([5, 6, 9, 10, 12, 15, 18, 20]); const k = rand(1, Math.min(4, Math.floor(n / 2)));
        return T('円周を ' + n + ' 等分する点を順に A1、A2、… とします。弧 A1A' + (k + 1) + '（' + k + ' 個ぶんの弧）に対する円周角は何度ですか。', '弧1つ分の中心角は 360÷' + n + ' ＝ ' + 360 / n + '°。' + k + ' 個ぶんで ' + 360 * k / n + '°。円周角はその半分で ' + 180 * k / n + '°。', 180 * k / n, '°'); }
      default: { const a = rand(20, 80);
        return T('円 O の円周上に3点 A、B、C があり、∠ABC = ' + a + '° です。O は円の中心とします。∠OAC は何度ですか。', '中心角 ∠AOC ＝ ' + a + '×2 ＝ ' + 2 * a + '°。OA ＝ OC（半径）で △OAC は二等辺三角形なので、∠OAC ＝ (180 − ' + 2 * a + ')÷2 ＝ ' + (90 - a) + '°。', 90 - a, '°'); }
    }
  }

  registerMath('s_j3', [
    { id: 'j3_tenkai', name: '多項式の展開', gen: genExpand },
    { id: 'j3_inbun', name: '因数分解', gen: genFactor },
    { id: 'j3_sqrt1', name: '平方根の簡約・加減・乗法', gen: genSqrtA },
    { id: 'j3_sqrt2', name: '平方根の乗除・有理化・式の値', gen: genSqrtB },
    { id: 'j3_niji', name: '二次方程式', gen: genQuad },
    { id: 'j3_func', name: '関数 y = ax²', gen: genFunc },
    { id: 'j3_pyth', name: '三平方の定理', gen: genPyth },
    { id: 'j3_similar', name: '相似', gen: genSimilar },
    { id: 'j3_circle', name: '円周角の定理と角度', gen: genCircle },
  ]);
})();
