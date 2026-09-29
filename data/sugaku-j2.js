(function(){
  // ===== ヘルパー =====
  var M = '−';
  function S(n){ return n < 0 ? M + (-n) : '' + n; }
  function nz(a, b){ var v; do { v = rand(a, b); } while (v === 0); return v; }
  function until(fn){
    for (var i = 0; i < 500; i++){ var r = fn(); if (r) return r; }
    return fn();
  }
  // list: [[coef, varString], ...]  -> "3x − y + 2"
  function poly(list){
    var s = '';
    list.forEach(function(t){
      var c = t[0], v = t[1];
      if (c === 0) return;
      var a = Math.abs(c);
      var body = (a === 1 && v) ? v : (a + v);
      if (s === '') s = (c < 0 ? M : '') + body;
      else s += (c < 0 ? ' ' + M + ' ' : ' + ') + body;
    });
    return s || '0';
  }
  function P(n){ return n < 0 ? '(' + S(n) + ')' : '' + n; }
  function pt(x, y){ return '(' + S(x) + ', ' + S(y) + ')'; }
  function uniq(arr){ var o = [], seen = {}; arr.forEach(function(a){ if(!seen[a]){ seen[a] = 1; o.push(a); } }); return o; }
  function near(v, extra){
    // 整数vに近い誤答の候補(文字列)
    var c = [v + 1, v - 1, -v, v + 2, v - 2, v * 2].concat(extra || []);
    return uniq(c.filter(function(x){ return x !== v; }).map(S));
  }
  var X2h = 'x<sup>2</sup>', X2t = 'x²';

  // ===== 1. 式の計算 =====
  function genShiki(){
    var t = rand(0, 5);
    if (t === 0){
      return until(function(){
        var a = nz(-6,6), b = nz(-6,6), c = nz(-6,6), d = nz(-6,6);
        if (a + c === 0 && b + d === 0) return null;
        var q = '(' + poly([[a,'x'],[b,'y']]) + ') + (' + poly([[c,'x'],[d,'y']]) + ')';
        return mkCard(q + ' を計算しなさい。', poly([[a+c,'x'],[b+d,'y']]),
          [poly([[a-c,'x'],[b-d,'y']]), poly([[a+c,'x'],[b-d,'y']]), poly([[a-c,'x'],[b+d,'y']]), poly([[a+c,'x'],[-(b+d),'y']])],
          'かっこをはずして、同じ文字の項(同類項)どうしを足します。x の項は ' + S(a) + ' + ' + '(' + S(c) + ') = ' + S(a+c) + '、y の項は ' + S(b) + ' + (' + S(d) + ') = ' + S(b+d) + ' です。');
      });
    }
    if (t === 1){
      return until(function(){
        var a = nz(-6,6), b = nz(-6,6), c = nz(-6,6), d = nz(-6,6);
        if (a - c === 0 && b - d === 0) return null;
        var q = '(' + poly([[a,'x'],[b,'y']]) + ') − (' + poly([[c,'x'],[d,'y']]) + ')';
        return mkCard(q + ' を計算しなさい。', poly([[a-c,'x'],[b-d,'y']]),
          [poly([[a-c,'x'],[b+d,'y']]), poly([[a+c,'x'],[b-d,'y']]), poly([[a+c,'x'],[b+d,'y']]), poly([[c-a,'x'],[d-b,'y']])],
          'ひくかっこをはずすと、かっこの中の項の符号がすべて変わります。x の項は ' + S(a-c) + '、y の項は ' + S(b-d) + ' です。');
      });
    }
    if (t === 2){
      return until(function(){
        var p = rand(2,5), q = nz(-4,4); if (Math.abs(q) < 2) return null;
        var a = nz(-4,4), b = nz(-6,6), c = nz(-4,4), d = nz(-6,6);
        var A = p*a + q*c, B = p*b + q*d;
        if (A === 0 && B === 0) return null;
        var sq = q < 0 ? -1 : 1;
        var qs = p + '(' + poly([[a,'x'],[b,'']]) + ') ' + (q < 0 ? '−' : '+') + ' ' + Math.abs(q) + '(' + poly([[c,'x'],[d,'']]) + ')';
        return mkCard(qs + ' を計算しなさい。', poly([[A,'x'],[B,'']]),
          [poly([[p*a+q*c,'x'],[p*b+sq*d,'']]), poly([[a+q*c,'x'],[b+q*d,'']]), poly([[p*a-q*c,'x'],[p*b-q*d,'']]), poly([[A,'x'],[-B,'']]), poly([[A+1,'x'],[B,'']]), poly([[A,'x'],[B+1,'']])],
          '分配法則で、かっこの中の全部の項に前の数をかけます。' + poly([[p*a,'x'],[p*b,'']]) + ' と ' + poly([[q*c,'x'],[q*d,'']]) + ' を足して、同類項をまとめると ' + poly([[A,'x'],[B,'']]) + ' です。');
      });
    }
    if (t === 3){
      return until(function(){
        var a = nz(-6,6), b = nz(-6,6), c = nz(-6,6), d = nz(-6,6), e = nz(-6,6), f = nz(-6,6);
        var q = '(' + poly([[a,X2h],[b,'x'],[c,'']]) + ') − (' + poly([[d,X2h],[e,'x'],[f,'']]) + ')';
        return mkCard(q + ' を計算しなさい。', poly([[a-d,X2h],[b-e,'x'],[c-f,'']]),
          [poly([[a-d,X2h],[b+e,'x'],[c+f,'']]), poly([[a+d,X2h],[b+e,'x'],[c+f,'']]), poly([[a-d,X2h],[b-e,'x'],[c+f,'']]), poly([[d-a,X2h],[e-b,'x'],[f-c,'']])],
          'x' + sup(2) + ' の項、x の項、数の項をそれぞれ計算します。ひくかっこをはずすときは符号に注意します。');
      });
    }
    if (t === 4){
      return until(function(){
        var k = rand(2,4), a = nz(-5,5), b = nz(-5,5);
        var A = k*a, B = k*b;
        var q = '(' + poly([[A,X2h],[B,'x']]) + ') ÷ ' + k + 'x';
        return mkCard(q + ' を計算しなさい。', poly([[a,'x'],[b,'']]),
          [poly([[a,'x'],[B,'']]), poly([[a,'x'],[-b,'']]), poly([[A,'x'],[b,'']]), poly([[a,'x'],[b,'x']]), poly([[a+1,'x'],[b,'']])],
          '多項式を単項式でわるときは、各項を ' + k + 'x でわります。' + poly([[A,X2h]]) + ' ÷ ' + k + 'x = ' + poly([[a,'x']]) + '、' + poly([[B,'x']]) + ' ÷ ' + k + 'x = ' + S(b) + ' です。');
      });
    }
    // 単項式の乗除
    return until(function(){
      var c = rand(2,4), s = rand(1,3), b = nz(-5,5);
      if (Math.abs(b) === 1) return null;
      var a = c * s * (Math.random() < 0.5 ? -1 : 1);
      var co = (a / c) * b;
      var Y2 = 'y' + sup(2);
      var q = '(' + S(a) + X2h + 'y) × (' + S(b) + 'xy' + sup(2) + ') ÷ (' + c + 'xy)';
      var xy = X2h + Y2;
      var ans = poly([[co, xy]]);
      return mkCard(q + ' を計算しなさい。', ans,
        [poly([[co, X2h + 'y']]), poly([[co, 'x' + sup(3) + 'y' + sup(3)]]), poly([[-co, xy]]), poly([[a/c + b, xy]])],
        '係数どうし、文字どうしに分けて計算します。係数は ' + S(a) + ' × ' + S(b) + ' ÷ ' + c + ' = ' + S(co) + '、x は 2+1−1=2 乗、y は 1+2−1=2 乗です。');
    });
  }

  // ===== 2. 式の値と文字式の利用 =====
  function genShikiNoAtai(){
    var t = rand(0, 7);
    if (t === 0){
      return until(function(){
        var p = rand(2,5), q = nz(-3,3), r = rand(2,5), s = nz(-3,3);
        var A = p - r, B = p*q - r*s;
        if (A === 0 && B === 0) return null;
        var x0 = nz(-5,5), y0 = nz(-5,5);
        var e = p + '(' + poly([[1,'x'],[q,'y']]) + ') − ' + r + '(' + poly([[1,'x'],[s,'y']]) + ')';
        return { kind:'text', text:'x = ' + S(x0) + '、y = ' + S(y0) + ' のとき、' + e + ' の値は？',
          explain:'式を整理すると ' + poly([[A,'x'],[B,'y']]) + '。x = ' + S(x0) + '、y = ' + S(y0) + ' を代入して ' + S(A*x0 + B*y0) + '。',
          answers:[{type:'int', value:A*x0 + B*y0}] };
      });
    }
    if (t === 1){
      var a = rand(1,4), b = nz(-5,5), x0 = nz(-4,4), y0 = nz(-5,5);
      var v = a*x0*x0 + b*y0;
      return { kind:'text', text:'x = ' + S(x0) + '、y = ' + S(y0) + ' のとき、' + poly([[a,X2t],[b,'y']]) + ' の値は？',
        explain:'x² = (' + S(x0) + ')² = ' + (x0*x0) + ' なので、' + a + ' × ' + (x0*x0) + ' + ' + P(b) + ' × ' + P(y0) + ' = ' + S(v) + '。',
        answers:[{type:'int', value:v}] };
    }
    if (t === 2){
      var a2 = rand(1,3), b2 = nz(-6,6), c2 = nz(-8,8), x1 = nz(-4,4);
      var v2 = a2*x1*x1 + b2*x1 + c2;
      return { kind:'text', text:'x = ' + S(x1) + ' のとき、' + poly([[a2,X2t],[b2,'x'],[c2,'']]) + ' の値は？',
        explain:'x に ' + S(x1) + ' を代入すると、' + a2 + ' × ' + (x1*x1) + ' + ' + P(b2) + ' × ' + P(x1) + ' + ' + P(c2) + ' = ' + S(v2) + '。',
        answers:[{type:'int', value:v2}] };
    }
    if (t === 3){
      return until(function(){
        var k = rand(2,5), a3 = nz(-4,4), b3 = nz(-4,4);
        var x2 = nz(-4,4), y2 = nz(-4,4);
        var v3 = a3*k*x2*x2*y2 / (k*x2);
        return { kind:'text', text:'x = ' + S(x2) + '、y = ' + S(y2) + ' のとき、' + (a3*k === 1 ? '' : (a3*k === -1 ? M : S(a3*k))) + 'x²y ÷ ' + k + 'x の値は？',
          explain:'先に式を簡単にすると ' + poly([[a3,'xy']]) + '。x = ' + S(x2) + '、y = ' + S(y2) + ' を代入して ' + S(v3) + '。',
          answers:[{type:'int', value:v3}] };
      });
    }
    if (t === 4){
      // 等式の変形 ax + by = c を y について解く
      return until(function(){
        var a4 = nz(-5,5), b4 = rand(2,5), c4 = rand(2,12);
        if (a4 % b4 === 0 && c4 % b4 === 0) return null;
        if (gcd(gcd(Math.abs(a4), c4), b4) > 1) return null;
        var num = poly([[c4,''],[-a4,'x']]);
        return mkCard(poly([[a4,'x'],[b4,'y']]) + ' = ' + c4 + ' を y について解きなさい。',
          'y = ' + fracHTMLRaw(num, b4),
          ['y = ' + fracHTMLRaw(poly([[c4,''],[a4,'x']]), b4), 'y = ' + poly([[c4,''],[-a4,'x']]),
           'y = ' + c4 + ' ' + M + ' ' + Math.abs(a4) + 'x/' + b4, 'y = ' + fracHTMLRaw(poly([[a4,'x'],[-c4,'']]), b4)],
          poly([[a4,'x']]) + ' を右辺に移項して ' + poly([[b4,'y']]) + ' = ' + num + '。両辺を ' + b4 + ' でわると y = (' + num + ')/' + b4 + ' です。');
      });
    }
    if (t === 5){
      var a5 = rand(2,5), b5 = nz(-8,8);
      var wrongXY = 'x = ';
      return mkCard('y = ' + poly([[a5,'x'],[b5,'']]) + ' を x について解きなさい。',
        'x = ' + fracHTMLRaw(poly([[1,'y'],[-b5,'']]), a5),
        ['x = ' + fracHTMLRaw(poly([[1,'y'],[b5,'']]), a5), 'x = y ' + (b5 < 0 ? '+ ' + (-b5) : M + ' ' + b5) + '/' + a5,
         'x = ' + poly([[a5,'y'],[-b5,'']]), 'x = ' + fracHTMLRaw(poly([[1,'y'],[b5,'']]), a5) + ' ' + M + ' ' + a5],
        '定数 ' + S(b5) + ' を移項して ' + poly([[a5,'x']]) + ' = ' + poly([[1,'y'],[-b5,'']]) + '。両辺を ' + a5 + ' でわります。');
    }
    if (t === 6){
      // ℓ = 2(a + b)
      var m = pick([2,2,3]);
      if (m === 2){
        return mkCard('周の長さが ℓ の長方形で、縦を a、横を b とすると ℓ = 2(a + b) です。この式を b について解きなさい。',
          'b = ' + fracHTMLRaw('ℓ', 2) + ' ' + M + ' a',
          ['b = ℓ ' + M + ' a', 'b = ' + fracHTMLRaw('ℓ', 2) + ' + a', 'b = 2ℓ ' + M + ' a', 'b = ' + fracHTMLRaw('ℓ ' + M + ' a', 2)],
          '両辺を 2 でわると ℓ/2 = a + b。a を移項して b = ℓ/2 − a です。');
      }
      return mkCard('底辺 a、高さ h の三角形の面積を S とすると、S = ' + fracHTMLRaw('1', 2) + ' ah です。この式を h について解きなさい。',
        'h = ' + fracHTMLRaw('2S', 'a'),
        ['h = ' + fracHTMLRaw('S', '2a'), 'h = ' + fracHTMLRaw('a', '2S'), 'h = 2Sa', 'h = ' + fracHTMLRaw('2', 'Sa')],
        '両辺に 2 をかけて 2S = ah。両辺を a でわると h = 2S/a です。');
    }
    // 文字式の利用
    var u = rand(0, 3);
    if (u === 0){
      var pa = rand(4,15) * 10, pb = rand(3,12) * 10, pay = pick([1000, 1500, 2000]);
      return mkCard('1個 ' + pa + ' 円のりんごを x 個と、1個 ' + pb + ' 円のみかんを y 個買って、' + pay + ' 円払いました。おつりを x、y を使った式で表しなさい。',
        pay + ' ' + M + ' ' + pa + 'x ' + M + ' ' + pb + 'y',
        [pay + ' ' + M + ' (' + pa + 'x + ' + pb + ')y', pay + ' ' + M + ' ' + pa + 'x + ' + pb + 'y', pa + 'x + ' + pb + 'y', pay + ' ' + M + ' ' + (pa + pb) + 'xy'],
        '代金は りんご ' + pa + 'x 円、みかん ' + pb + 'y 円 なので、おつりは 払った金額 − 代金 = ' + pay + ' − ' + pa + 'x − ' + pb + 'y (円) です。');
    }
    if (u === 1){
      var w = pick(['smallest', 'middle', 'largest']);
      var qn = { smallest: '連続する3つの整数のうち、もっとも小さい数を n とするとき、この3つの整数の和を n を使った式で表しなさい。',
                 middle: '連続する3つの整数のうち、まん中の数を n とするとき、この3つの整数の和を n を使った式で表しなさい。',
                 largest: '連続する3つの整数のうち、もっとも大きい数を n とするとき、この3つの整数の和を n を使った式で表しなさい。' }[w];
      var ans = { smallest: '3n + 3', middle: '3n', largest: '3n − 3' }[w];
      var ex = { smallest: '3つの整数は n、n+1、n+2 なので、和は 3n + 3 です。', middle: '3つの整数は n−1、n、n+1 なので、和は 3n です。', largest: '3つの整数は n−2、n−1、n なので、和は 3n − 3 です。' }[w];
      var wr = ['3n', '3n + 3', '3n − 3', '3n + 1', '3n + 6', '3n − 6', 'n + 3', 'n + 2'].filter(function(z){ return z !== ans; });
      return mkCard(qn, ans, shuffle(wr).slice(0,4), ex);
    }
    if (u === 2){
      return mkCard('十の位の数が x、一の位の数が y の2けたの自然数があります。この数の十の位と一の位を入れかえた数と、もとの数の和を、x、y を使って表しなさい。',
        '11(x + y)',
        ['10(x + y)', 'x + y', '11xy', '9(x + y)'],
        'もとの数は 10x + y、入れかえた数は 10y + x。和は 11x + 11y = 11(x + y) です。');
    }
    return mkCard('十の位の数が x、一の位の数が y の2けたの自然数があります。この数から、十の位と一の位を入れかえた数をひいた差を、x、y を使って表しなさい。',
      '9(x ' + M + ' y)',
      ['9(x + y)', '11(x ' + M + ' y)', '10(x ' + M + ' y)', 'x ' + M + ' y'],
      'もとの数は 10x + y、入れかえた数は 10y + x。差は (10x + y) − (10y + x) = 9x − 9y = 9(x − y) です。');
  }

  // ===== 3. 連立方程式 =====
  function eqStr(a, b, c){ return poly([[a,'x'],[b,'y']]) + ' = ' + S(c); }
  function sysQ(rows){
    return '次の連立方程式を解きなさい。<br>' + '　① ' + rows[0] + '<br>　② ' + rows[1];
  }
  function genRensei(){
    var t = rand(0, 5);
    if (t <= 1){
      // 加減法(ふつうの形)
      return until(function(){
        var x0 = rand(-5,5), y0 = rand(-5,5);
        if (x0 === 0 && y0 === 0) return null;
        var a1 = nz(-5,5), b1 = nz(-5,5), a2 = nz(-5,5), b2 = nz(-5,5);
        if (a1*b2 - a2*b1 === 0) return null;
        var c1 = a1*x0 + b1*y0, c2 = a2*x0 + b2*y0;
        var q = sysQ([eqStr(a1,b1,c1), eqStr(a2,b2,c2)]);
        var ex = '加減法で、x か y の係数をそろえて式を足したり引いたりして1つの文字を消します。解は x = ' + S(x0) + '、y = ' + S(y0) + ' です。(元の式に代入して確かめられます)';
        var kind = rand(0, 2);
        if (kind === 0){
          return mkCard(q + '<br>x、y の値を答えなさい。', 'x = ' + S(x0) + ', y = ' + S(y0),
            ['x = ' + S(y0) + ', y = ' + S(x0), 'x = ' + S(-x0) + ', y = ' + S(y0), 'x = ' + S(x0) + ', y = ' + S(-y0), 'x = ' + S(x0+1) + ', y = ' + S(y0), 'x = ' + S(x0) + ', y = ' + S(y0-1)], ex);
        }
        if (kind === 1){
          return mkCard(q + '<br>x の値を答えなさい。', 'x = ' + S(x0),
            near(x0, [y0]).map(function(z){ return 'x = ' + z; }), ex);
        }
        return mkCard(q + '<br>y の値を答えなさい。', 'y = ' + S(y0),
          near(y0, [x0]).map(function(z){ return 'y = ' + z; }), ex);
      });
    }
    if (t === 2){
      // 代入法
      return until(function(){
        var x0 = rand(-5,5), y0 = rand(-5,5);
        if (x0 === 0 && y0 === 0) return null;
        var p = nz(-3,3), q0 = y0 - p*x0;
        if (Math.abs(q0) > 12) return null;
        var a = nz(-4,4), b = nz(-4,4);
        if (a + b*p === 0) return null;
        var c = a*x0 + b*y0;
        var rows = ['y = ' + poly([[p,'x'],[q0,'']]), poly([[a,'x'],[b,'y']]) + ' = ' + S(c)];
        var q = sysQ(rows);
        return mkCard(q + '<br>x、y の値を答えなさい。', 'x = ' + S(x0) + ', y = ' + S(y0),
          ['x = ' + S(y0) + ', y = ' + S(x0), 'x = ' + S(-x0) + ', y = ' + S(y0), 'x = ' + S(x0) + ', y = ' + S(-y0), 'x = ' + S(x0+1) + ', y = ' + S(y0+p), 'x = ' + S(x0) + ', y = ' + S(y0+1), 'x = ' + S(x0-1) + ', y = ' + S(y0)],
          '代入法で、①の y を②に代入して x だけの式にします。x = ' + S(x0) + ' を①に入れて y = ' + S(y0) + ' となります。');
      });
    }
    if (t === 3){
      // 解から係数
      return until(function(){
        var x0 = nz(-4,4), y0 = nz(-4,4), a0 = nz(-5,5), b0 = nz(-5,5);
        var c0 = a0*x0 + b0*y0;
        var askA = Math.random() < 0.5;
        var lhs = askA ? ('a' + 'x' + ' ' + (b0 < 0 ? M : '+') + ' ' + (Math.abs(b0) === 1 ? '' : Math.abs(b0)) + 'y') : ((Math.abs(a0) === 1 ? (a0 < 0 ? M : '') : S(a0)) + 'x ' + '+ by');
        var val = askA ? a0 : b0;
        return { kind:'text', text:'x = ' + S(x0) + '、y = ' + S(y0) + ' が方程式 ' + lhs + ' = ' + S(c0) + ' の解であるとき、' + (askA ? 'a' : 'b') + ' の値は？',
          explain:'x = ' + S(x0) + '、y = ' + S(y0) + ' を代入すると ' + (askA ? 'a × (' + S(x0) + ') + (' + S(b0) + ') × (' + S(y0) + ')' : '(' + S(a0) + ') × (' + S(x0) + ') + b × (' + S(y0) + ')') + ' = ' + S(c0) + '。これを解いて ' + (askA ? 'a' : 'b') + ' = ' + S(val) + '。',
          answers:[{type:'int', value:val}] };
      });
    }
    // 文章題
    return until(function(){
      var items = pick([['えんぴつ','ノート','本','冊'], ['りんご','みかん','個','個'], ['ケーキ','ジュース','個','本']]);
      var P = rand(3,15) * 10, N = rand(4,20) * 10;
      var a1 = rand(1,5), b1 = rand(1,5), a2 = rand(1,5), b2 = rand(1,5);
      if (a1*b2 - a2*b1 === 0) return null;
      var c1 = a1*P + b1*N, c2 = a2*P + b2*N;
      var askP = Math.random() < 0.5;
      var val = askP ? P : N;
      return { kind:'text',
        text:items[0] + ' ' + a1 + items[2] + ' と ' + items[1] + ' ' + b1 + items[3] + ' を買うと ' + c1 + ' 円、' + items[0] + ' ' + a2 + items[2] + ' と ' + items[1] + ' ' + b2 + items[3] + ' を買うと ' + c2 + ' 円になります。' + (askP ? items[0] : items[1]) + ' 1つの値段は？',
        explain:items[0] + ' 1つを x 円、' + items[1] + ' 1つを y 円として連立方程式 ' + poly([[a1,'x'],[b1,'y']]) + ' = ' + c1 + '、' + poly([[a2,'x'],[b2,'y']]) + ' = ' + c2 + ' を解くと、x = ' + P + '、y = ' + N + ' です。',
        answers:[{type:'int', value:val, unit:'円'}] };
    });
  }

  // ===== 4. 一次関数 =====
  function fx(a, b){ return poly([[a,'x'],[b,'']]); }
  function genIchiji(){
    var t = rand(0, 8);
    if (t === 0){
      return until(function(){
        var a = nz(-5,5), b = nz(-9,9), x0 = nz(-5,5);
        var v = a*x0 + b;
        return { kind:'text', text:'一次関数 y = ' + fx(a,b) + ' で、x = ' + S(x0) + ' のときの y の値は？',
          explain:'x に ' + S(x0) + ' を代入して y = ' + S(a) + ' × (' + S(x0) + ') + (' + S(b) + ') = ' + S(v) + '。', answers:[{type:'int', value:v}] };
      });
    }
    if (t === 1){
      return until(function(){
        var a = nz(-5,5), b = nz(-9,9), x0 = nz(-5,5);
        var y0 = a*x0 + b;
        return { kind:'text', text:'一次関数 y = ' + fx(a,b) + ' で、y = ' + S(y0) + ' となるときの x の値は？',
          explain:S(y0) + ' = ' + fx(a,b) + ' を解いて x = ' + S(x0) + '。', answers:[{type:'int', value:x0}] };
      });
    }
    if (t === 2){
      var a2 = nz(-5,5), b2 = nz(-9,9), p = rand(-4,2), q = p + rand(2,5);
      return { kind:'text', text:'一次関数 y = ' + fx(a2,b2) + ' で、x の値が ' + S(p) + ' から ' + S(q) + ' まで増加するとき、y の増加量は？(減るときは負の数で答える)',
        explain:'y の増加量 = 変化の割合 × x の増加量 = ' + S(a2) + ' × ' + (q-p) + ' = ' + S(a2*(q-p)) + '。', answers:[{type:'int', value:a2*(q-p)}] };
    }
    if (t === 3){
      var d = rand(2,4), a3 = nz(-5,5);
      return { kind:'text', text:'y は x の一次関数で、x が ' + d + ' 増加すると y は ' + S(a3*d) + ' 増加します。この一次関数の変化の割合(傾き)は？',
        explain:'変化の割合 = y の増加量 ÷ x の増加量 = ' + S(a3*d) + ' ÷ ' + d + ' = ' + S(a3) + '。', answers:[{type:'int', value:a3}] };
    }
    if (t === 4){
      return until(function(){
        var a = nz(-5,5), b = nz(-8,8), x1 = rand(-4,4), x2 = x1 + rand(1,4);
        var y1 = a*x1 + b, y2 = a*x2 + b;
        return { kind:'text', text:'2点 ' + pt(x1,y1) + '、' + pt(x2,y2) + ' を通る直線の傾きは？',
          explain:'傾き = (y の増加量) ÷ (x の増加量) = (' + S(y2) + ' − ' + (y1 < 0 ? '(' + S(y1) + ')' : y1) + ') ÷ (' + S(x2) + ' − ' + (x1 < 0 ? '(' + S(x1) + ')' : x1) + ') = ' + S(a) + '。',
          answers:[{type:'int', value:a}] };
      });
    }
    var badF = function(a, b){ return [fx(b,a), fx(a,-b), fx(-a,b), fx(a+1,b), fx(a,b+a)]; };
    if (t === 5){
      return until(function(){
        var a = nz(-5,5), b = nz(-9,9), x1 = rand(-4,0), x2 = x1 + rand(1,4);
        var y1 = a*x1 + b, y2 = a*x2 + b;
        if (b === 0) return null;
        return mkCard('2点 ' + pt(x1,y1) + '、' + pt(x2,y2) + ' を通る直線の式を求めなさい。', 'y = ' + fx(a,b),
          badF(a,b).map(function(z){ return 'y = ' + z; }),
          '傾きは (' + S(y2) + ' − ' + (y1 < 0 ? '(' + S(y1) + ')' : y1) + ') ÷ (' + S(x2) + ' − ' + (x1 < 0 ? '(' + S(x1) + ')' : x1) + ') = ' + S(a) + '。y = ' + poly([[a,'x'],[1,'b']]) + ' に点 ' + pt(x1,y1) + ' の座標を代入して切片 b = ' + S(b) + '。');
      });
    }
    if (t === 6){
      return until(function(){
        var a = nz(-5,5), b = nz(-9,9), x1 = nz(-4,4);
        if (b === 0) return null;
        var y1 = a*x1 + b;
        return mkCard('傾きが ' + S(a) + ' で、点 ' + pt(x1,y1) + ' を通る直線の式を求めなさい。', 'y = ' + fx(a,b),
          badF(a,b).map(function(z){ return 'y = ' + z; }),
          '傾きが ' + S(a) + ' なので y = ' + poly([[a,'x'],[1,'b']]) + ' とおき、x = ' + S(x1) + '、y = ' + S(y1) + ' を代入すると b = ' + S(b) + ' です。');
      });
    }
    if (t === 7){
      return until(function(){
        var a = nz(-5,5), b0 = nz(-9,9), b = nz(-9,9), x1 = nz(-4,4);
        if (b === 0 || b === b0) return null;
        var y1 = a*x1 + b;
        return mkCard('直線 y = ' + fx(a,b0) + ' に平行で、点 ' + pt(x1,y1) + ' を通る直線の式を求めなさい。', 'y = ' + fx(a,b),
          badF(a,b).concat(['y = ' + fx(a,b0)]).map(function(z){ return z.indexOf('y =') === 0 ? z : 'y = ' + z; }),
          '平行な直線は傾きが等しいので傾きは ' + S(a) + '。y = ' + poly([[a,'x'],[1,'b']]) + ' に点の座標を代入して b = ' + S(b) + ' です。');
      });
    }
    // 変化の割合・傾き・切片を読む
    var a4 = nz(-6,6), b4 = nz(-9,9);
    if (b4 === 0) b4 = 3;
    var ask = pick(['傾き', '切片']);
    var val = ask === '傾き' ? a4 : b4;
    return { kind:'text', text:'一次関数 y = ' + fx(a4,b4) + ' のグラフの' + ask + 'は？',
      explain:'y = ax + b の形で、a が傾き(変化の割合)、b が切片(y 軸との交点の y 座標)です。', answers:[{type:'int', value:val}] };
  }

  // ===== 5. 一次関数のグラフ =====
  function genGraph(){
    var t = rand(0, 5);
    if (t === 0){
      var a = nz(-4,4), k = nz(-6,6), b = -a*k;
      return mkCard('直線 y = ' + fx(a,b) + ' と x 軸との交点の座標を答えなさい。', pt(k,0),
        [pt(-k,0), pt(0,k), pt(0,b), pt(b,0), pt(0,-k)],
        'x 軸上では y = 0。0 = ' + fx(a,b).replace(/^/, '') + ' を解いて x = ' + S(k) + ' なので、交点は ' + pt(k,0) + ' です。');
    }
    if (t === 1){
      var a1 = nz(-5,5), b1 = nz(-9,9);
      return mkCard('直線 y = ' + fx(a1,b1) + ' と y 軸との交点の座標を答えなさい。', pt(0,b1),
        [pt(b1,0), pt(0,-b1), pt(0,a1), pt(a1,0), pt(-b1,0)],
        'y 軸上では x = 0。x = 0 を代入して y = ' + S(b1) + '(切片)。交点は ' + pt(0,b1) + ' です。');
    }
    if (t === 2 || t === 3){
      return until(function(){
        var x0 = nz(-5,5), y0 = rand(-6,6), a1 = nz(-4,4), a2 = nz(-4,4);
        if (a1 === a2) return null;
        var b1 = y0 - a1*x0, b2 = y0 - a2*x0;
        if (Math.abs(b1) > 14 || Math.abs(b2) > 14) return null;
        var q = '2直線 y = ' + fx(a1,b1) + ' と y = ' + fx(a2,b2) + ' の交点の座標を答えなさい。';
        return mkCard(q, pt(x0,y0),
          [pt(y0,x0), pt(-x0,y0), pt(x0,-y0), pt(x0+1,y0), pt(x0,y0+1)],
          '2つの式から y を消すと ' + fx(a1,b1) + ' = ' + fx(a2,b2) + '。これを解いて x = ' + S(x0) + '、y = ' + S(y0) + ' なので、交点は ' + pt(x0,y0) + ' です。');
      });
    }
    if (t === 4){
      return until(function(){
        var x0 = nz(-4,4), y0 = rand(-5,5), a1 = nz(-3,3), a2 = nz(-3,3);
        if (a1 === a2) return null;
        if ((Math.abs(a2 - a1) * x0 * x0) % 2 !== 0) return null;
        var b1 = y0 - a1*x0, b2 = y0 - a2*x0;
        var area = Math.abs(a2 - a1) * x0 * x0 / 2;
        return { kind:'text', text:'2直線 y = ' + fx(a1,b1) + '、y = ' + fx(a2,b2) + ' と y 軸で囲まれる三角形の面積は？(座標の1目もりを 1 cm とする)',
          explain:'2直線の交点は ' + pt(x0,y0) + '。y 軸上の2点は ' + pt(0,b1) + ' と ' + pt(0,b2) + ' で、底辺 = ' + Math.abs(b1 - b2) + '、高さ = ' + Math.abs(x0) + ' なので、面積 = ' + Math.abs(b1-b2) + ' × ' + Math.abs(x0) + ' ÷ 2 = ' + area + '。',
          answers:[{type:'int', value:area, unit:'cm²'}] };
      });
    }
    // 通る点から係数
    var a5 = nz(-4,4), b5 = nz(-8,8), p = nz(-4,4), q = a5*p + b5;
    if (Math.random() < 0.5){
      return { kind:'text', text:'直線 y = ax + ' + (b5 < 0 ? '(' + S(b5) + ')' : b5) + ' が点 ' + pt(p,q) + ' を通るとき、a の値は？',
        explain:'x = ' + S(p) + '、y = ' + S(q) + ' を代入して ' + S(q) + ' = a × (' + S(p) + ') + (' + S(b5) + ')。これを解いて a = ' + S(a5) + '。', answers:[{type:'int', value:a5}] };
    }
    return { kind:'text', text:'直線 y = ' + poly([[a5,'x'],[1,'b']]) + ' が点 ' + pt(p,q) + ' を通るとき、b の値は？',
      explain:'x = ' + S(p) + '、y = ' + S(q) + ' を代入して ' + S(q) + ' = ' + S(a5) + ' × (' + S(p) + ') + b。これを解いて b = ' + S(b5) + '。', answers:[{type:'int', value:b5}] };
  }

  // ===== 6. 図形の角度 =====
  function ang(q, v, ex){ return { kind:'text', text:q, explain:ex, answers:[{type:'int', value:v, unit:'°'}] }; }
  function genKakudo(){
    var t = rand(0, 13);
    if (t === 0){
      var a = rand(30,90), b = rand(30,90);
      if (a + b > 150) b = 150 - a;
      return ang('三角形 ABC で、∠A = ' + a + '°、∠B = ' + b + '° のとき、∠C の大きさは？', 180-a-b,
        '三角形の内角の和は 180° なので、∠C = 180° − ' + a + '° − ' + b + '° = ' + (180-a-b) + '°。');
    }
    if (t === 1){
      var a1 = rand(25,85), b1 = rand(25,85);
      return ang('三角形 ABC で、∠A = ' + a1 + '°、∠B = ' + b1 + '° のとき、頂点 C における外角の大きさは？', a1+b1,
        '三角形の外角は、それととなり合わない2つの内角の和に等しいので、' + a1 + '° + ' + b1 + '° = ' + (a1+b1) + '°。');
    }
    if (t === 2){
      var n = rand(5,12);
      return ang(n + '角形の内角の和は？', (n-2)*180, 'n 角形の内角の和は 180° × (n − 2)。180° × (' + n + ' − 2) = ' + ((n-2)*180) + '°。');
    }
    if (t === 3){
      var n3 = pick([5,6,8,9,10,12,15,18,20]);
      var ext = 360/n3;
      return ang('正' + n3 + '角形の1つの内角の大きさは？', 180-ext,
        '外角の和は 360° なので、1つの外角は 360° ÷ ' + n3 + ' = ' + ext + '°。内角 = 180° − ' + ext + '° = ' + (180-ext) + '°。');
    }
    if (t === 4){
      var n4 = pick([5,6,8,9,10,12,15,18,20,24]);
      return ang('正' + n4 + '角形の1つの外角の大きさは？', 360/n4, '多角形の外角の和は 360° なので、360° ÷ ' + n4 + ' = ' + (360/n4) + '°。');
    }
    if (t === 5){
      var n5 = pick([5,6,8,9,10,12,15,18,20,24,30]);
      return { kind:'text', text:'1つの外角が ' + (360/n5) + '° である正多角形は正何角形？', explain:'外角の和は 360° なので、360 ÷ ' + (360/n5) + ' = ' + n5 + '(角形)。', answers:[{type:'int', value:n5, unit:'角形'}] };
    }
    if (t === 6){
      var n6 = rand(5,12);
      return { kind:'text', text:'内角の和が ' + ((n6-2)*180) + '° である多角形は何角形？', explain:'180 × (n − 2) = ' + ((n6-2)*180) + ' より n − 2 = ' + (n6-2) + '、n = ' + n6 + '。', answers:[{type:'int', value:n6, unit:'角形'}] };
    }
    if (t === 7){
      var top = rand(5,17) * 2 + 20; // 頂角 (偶数)
      top = pick([20,30,36,40,44,50,56,64,70,80,90,100,110,120,130,140]);
      return ang('AB = AC の二等辺三角形 ABC で、∠A = ' + top + '° のとき、∠B の大きさは？', (180-top)/2,
        '二等辺三角形の底角は等しいので、∠B = (180° − ' + top + '°) ÷ 2 = ' + ((180-top)/2) + '°。');
    }
    if (t === 8){
      var bb = rand(25,80);
      return ang('AB = AC の二等辺三角形 ABC で、∠B = ' + bb + '° のとき、∠A の大きさは？', 180-2*bb,
        '∠C = ∠B = ' + bb + '° なので、∠A = 180° − ' + bb + '° × 2 = ' + (180-2*bb) + '°。');
    }
    if (t === 9){
      return until(function(){
        var s = [rand(70,130), rand(70,130), rand(70,130)];
        var r = 360 - s[0] - s[1] - s[2];
        if (r < 40 || r > 150) return null;
        return ang('四角形 ABCD で、∠A = ' + s[0] + '°、∠B = ' + s[1] + '°、∠C = ' + s[2] + '° のとき、∠D の大きさは？', r,
          '四角形の内角の和は 360° なので、∠D = 360° − (' + s[0] + '° + ' + s[1] + '° + ' + s[2] + '°) = ' + r + '°。');
      });
    }
    if (t === 10){
      return until(function(){
        var s = [rand(85,140), rand(85,140), rand(85,140), rand(85,140)];
        var r = 540 - s[0] - s[1] - s[2] - s[3];
        if (r < 50 || r > 170) return null;
        return ang('五角形 ABCDE で、∠A = ' + s[0] + '°、∠B = ' + s[1] + '°、∠C = ' + s[2] + '°、∠D = ' + s[3] + '° のとき、∠E の大きさは？', r,
          '五角形の内角の和は 540° なので、∠E = 540° − ' + (s[0]+s[1]+s[2]+s[3]) + '° = ' + r + '°。');
      });
    }
    if (t === 11){
      return until(function(){
        var C = rand(20,50), k = rand(2,3), A = 180 - C*(k+1);
        if (A < 20) return null;
        return ang('三角形 ABC で、∠A = ' + A + '° で、∠B の大きさは ∠C の ' + k + ' 倍です。∠B の大きさは？', k*C,
          '∠B + ∠C = 180° − ' + A + '° = ' + (180-A) + '°。∠C = x とすると ' + k + 'x + x = ' + (180-A) + ' より x = ' + C + '°。∠B = ' + (k*C) + '°。');
      });
    }
    if (t === 12){
      var a12 = rand(40,140);
      return ang('平行な2直線に、1本の直線が交わっています。できる同位角の1つが ' + a12 + '° のとき、その角と一直線上でとなり合う角の大きさは？', 180-a12,
        '平行線の同位角は等しいので、一直線上でとなり合う角との和が 180° になります。180° − ' + a12 + '° = ' + (180-a12) + '°。');
    }
    var a13 = rand(20,70), b13 = rand(20,70);
    return ang('三角形 ABC の頂点 A の外角が ' + (a13+b13) + '°、∠B が ' + a13 + '° のとき、∠C の大きさは？', b13,
      '外角は、となり合わない2つの内角の和に等しいので、∠C = ' + (a13+b13) + '° − ' + a13 + '° = ' + b13 + '°。');
  }

  // ===== 7. 確率 =====
  function fw(c, t, alts){
    var pairs = [[t-c,t],[c+1,t],[c-1,t],[c,t-1],[c,t+1]].concat(alts || []);
    var ok = [];
    pairs.forEach(function(p){
      if (p[0] >= 1 && p[0] < p[1] && p[0]*t !== c*p[1]) ok.push(fracHTML(p[0], p[1]));
    });
    return uniq(ok);
  }
  function probCard(q, c, t, alts, ex){
    return mkCard(q, fracHTML(c, t), fw(c, t, alts), ex + ' よって確率は ' + c + '/' + t + (gcd(c,t) > 1 ? ' = ' + (c/gcd(c,t)) + '/' + (t/gcd(c,t)) : '') + ' です。');
  }
  var isPrime = function(n){ if (n < 2) return false; for (var i = 2; i*i <= n; i++) if (n % i === 0) return false; return true; };
  function genKakuritsu(){
    var t = rand(0, 5);
    if (t === 0 || t === 1){
      return until(function(){
        var k = rand(3,11), d = rand(1,3), m = rand(3,6);
        var preds = [
          ['出る目の和が ' + k + ' になる', function(a,b){ return a+b === k; }],
          ['出る目の和が ' + (k+1 > 11 ? 10 : k+1) + ' 以上になる', function(a,b){ return a+b >= (k+1 > 11 ? 10 : k+1); }],
          ['出る目の和が ' + Math.min(k,6) + ' 以下になる', function(a,b){ return a+b <= Math.min(k,6); }],
          ['出る目の積が偶数になる', function(a,b){ return (a*b) % 2 === 0; }],
          ['出る目の積が奇数になる', function(a,b){ return (a*b) % 2 === 1; }],
          ['出る目の積が ' + m + ' の倍数になる', function(a,b){ return (a*b) % m === 0; }],
          ['出る目の差(大きい方−小さい方)が ' + d + ' になる', function(a,b){ return Math.abs(a-b) === d; }],
          ['同じ目が出る', function(a,b){ return a === b; }],
          ['少なくとも一方が 6 の目になる', function(a,b){ return a === 6 || b === 6; }],
          ['出る目の和が素数になる', function(a,b){ return isPrime(a+b); }]
        ];
        var pr = pick(preds), c = 0;
        for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (pr[1](i,j)) c++;
        if (c === 0 || c === 36) return null;
        return probCard('大小2つのさいころを同時に投げるとき、' + pr[0] + '確率は？', c, 36, [[c,12],[c,21],[c,6]],
          '目の出方は全部で 6×6 = 36 通り。そのうち条件に合うのは ' + c + ' 通り。');
      });
    }
    if (t === 2){
      var kk = rand(3,5), variant = rand(0,1);
      if (variant === 0){
        var j = rand(1, kk-1), c = nCk(kk, j), tt = Math.pow(2, kk);
        return probCard(kk + ' 枚の硬貨を同時に投げるとき、表がちょうど ' + j + ' 枚出る確率は？', c, tt, [[1,kk+1],[j,kk]],
          '表裏の出方は全部で 2^' + kk + ' = ' + tt + ' 通り。表が ' + j + ' 枚になるのは ' + c + ' 通り。');
      }
      var tt2 = Math.pow(2, kk);
      return probCard(kk + ' 枚の硬貨を同時に投げるとき、少なくとも 1 枚は表が出る確率は？', tt2-1, tt2, [[1,2],[kk,tt2]],
        '全部で ' + tt2 + ' 通り。すべて裏になるのは 1 通りだけなので、少なくとも1枚表が出るのは ' + (tt2-1) + ' 通り。');
    }
    if (t === 3){
      return until(function(){
        var n = rand(5,10), a = rand(2,4);
        if (a >= n - 1) return null;
        var v = rand(0, 3), tot = n*(n-1)/2;
        if (v === 0) return probCard('当たりくじ ' + a + ' 本を含む ' + n + ' 本のくじがあります。この中から同時に2本引くとき、2本とも当たる確率は？', a*(a-1)/2, tot, [[a*a,n*n],[a,n]],
          '2本の引き方は全部で ' + tot + ' 通り。2本とも当たりは ' + (a*(a-1)/2) + ' 通り。');
        if (v === 1) return probCard('当たりくじ ' + a + ' 本を含む ' + n + ' 本のくじがあります。この中から同時に2本引くとき、当たりがちょうど1本である確率は？', a*(n-a), tot, [[a,n],[a*(n-a),n*n]],
          '2本の引き方は全部で ' + tot + ' 通り。当たり1本・はずれ1本は ' + a + '×' + (n-a) + ' = ' + (a*(n-a)) + ' 通り。');
        if (v === 2) return probCard('当たりくじ ' + a + ' 本を含む ' + n + ' 本のくじがあります。この中から同時に2本引くとき、少なくとも1本は当たる確率は？', tot - (n-a)*(n-a-1)/2, tot, [[a,n]],
          '2本の引き方は全部で ' + tot + ' 通り。2本ともはずれは ' + ((n-a)*(n-a-1)/2) + ' 通りなので、少なくとも1本当たるのは ' + (tot - (n-a)*(n-a-1)/2) + ' 通り。');
        return probCard('当たりくじ ' + a + ' 本を含む ' + n + ' 本のくじがあります。この中から1本引くとき、はずれる確率は？', n-a, n, [[a*(n-a),n*n]],
          '全部で ' + n + ' 本、はずれは ' + (n-a) + ' 本。');
      });
    }
    if (t === 4){
      return until(function(){
        var N = rand(10,30), m = rand(3,5);
        var preds = [
          [m + ' の倍数のカードを引く', function(x){ return x % m === 0; }],
          ['素数のカードを引く', function(x){ return isPrime(x); }],
          ['2けたの数のカードを引く', function(x){ return x >= 10; }],
          [m + ' の倍数ではないカードを引く', function(x){ return x % m !== 0; }],
          ['平方数(整数の2乗になる数)のカードを引く', function(x){ var r = Math.round(Math.sqrt(x)); return r*r === x; }]
        ];
        var pr = pick(preds), c = 0;
        for (var i = 1; i <= N; i++) if (pr[1](i)) c++;
        if (c === 0 || c === N) return null;
        return probCard('1から ' + N + ' までの整数が1つずつ書かれた ' + N + ' 枚のカードから1枚引くとき、' + pr[0] + '確率は？', c, N, [[c,N-1]],
          'カードの引き方は全部で ' + N + ' 通り。条件に合うカードは ' + c + ' 枚。');
      });
    }
    return until(function(){
      var r = rand(2,5), w = rand(2,4), n = r + w, tot = n*(n-1)/2;
      var v = rand(0, 2);
      var cr = r*(r-1)/2, cw = w*(w-1)/2;
      if (v === 0) return probCard('赤玉 ' + r + ' 個と白玉 ' + w + ' 個が入った袋から、同時に2個取り出すとき、2個とも赤玉である確率は？', cr, tot, [[r*r,n*n],[r,n]],
        '2個の取り出し方は全部で ' + tot + ' 通り。2個とも赤玉は ' + cr + ' 通り。');
      if (v === 1) return probCard('赤玉 ' + r + ' 個と白玉 ' + w + ' 個が入った袋から、同時に2個取り出すとき、2個が同じ色である確率は？', cr + cw, tot, [[r*r+w*w,n*n]],
        '2個の取り出し方は全部で ' + tot + ' 通り。2個とも赤は ' + cr + ' 通り、2個とも白は ' + cw + ' 通りなので、同じ色は ' + (cr+cw) + ' 通り。');
      return probCard('赤玉 ' + r + ' 個と白玉 ' + w + ' 個が入った袋から、同時に2個取り出すとき、2個が異なる色である確率は？', r*w, tot, [[2*r*w,n*n]],
        '2個の取り出し方は全部で ' + tot + ' 通り。赤1個・白1個は ' + r + '×' + w + ' = ' + (r*w) + ' 通り。');
    });
  }

  // ===== 8. 三角形と四角形の性質・合同条件 =====
  function genSeishitsu(){
    var t = rand(0, 8);
    if (t === 0){
      // 与えられた等式から合同条件
      var sets = pick([['ABC','DEF'], ['PQR','XYZ'], ['KLM','STU']]);
      var rot = rand(0,2), i = rot, j = (rot+1)%3, k = (rot+2)%3;
      var s1 = sets[0], s2 = sets[1];
      var side = function(u,v){ return s1[u]+s1[v] + ' = ' + s2[u]+s2[v]; };
      var angle = function(u){ return '∠' + s1[u] + ' = ∠' + s2[u]; };
      var types = [
        ['3組の辺がそれぞれ等しい', side(i,j) + '、' + side(j,k) + '、' + side(k,i)],
        ['2組の辺とその間の角がそれぞれ等しい', side(i,j) + '、' + angle(j) + '、' + side(j,k)],
        ['1組の辺とその両端の角がそれぞれ等しい', angle(i) + '、' + side(i,j) + '、' + angle(j)]
      ];
      var ty = pick(types);
      var wrongs = types.filter(function(z){ return z !== ty; }).map(function(z){ return z[0]; }).concat(['3組の角がそれぞれ等しい']);
      return mkCard('△' + s1 + ' と △' + s2 + ' で、' + ty[1] + ' が成り立っています。この2つの三角形が合同であるといえる根拠となる合同条件は？',
        ty[0], wrongs, '成り立っている条件は「' + ty[0] + '」に当てはまります。');
    }
    if (t === 1){
      return mkCard('三角形の合同条件として正しくないもの(合同であるとはいえないもの)はどれか。',
        '3組の角がそれぞれ等しい',
        ['3組の辺がそれぞれ等しい', '2組の辺とその間の角がそれぞれ等しい', '1組の辺とその両端の角がそれぞれ等しい'],
        '3組の角が等しくても、大きさが違う相似な三角形になることがあり、合同とは限りません。');
    }
    if (t === 2){
      return mkCard('2つの直角三角形が合同であるといえる条件はどれか。',
        '斜辺と他の1辺がそれぞれ等しい',
        ['直角以外の1組の角がそれぞれ等しい', '斜辺だけが等しい', '2組の鋭角がそれぞれ等しい'],
        '直角三角形の合同条件は「斜辺と他の1辺」または「斜辺と1つの鋭角」がそれぞれ等しいことです。');
    }
    if (t === 3){
      var good = [
        ['2組の対辺がそれぞれ等しい', '2組の対辺がそれぞれ等しい四角形は平行四辺形です。'],
        ['対角線がそれぞれの中点で交わる', '対角線がそれぞれの中点で交わる四角形は平行四辺形です。'],
        ['1組の対辺が平行で長さが等しい', '1組の対辺が平行で等しい四角形は平行四辺形です。'],
        ['2組の対角がそれぞれ等しい', '2組の対角がそれぞれ等しい四角形は平行四辺形です。']
      ];
      var g = pick(good);
      return mkCard('四角形が平行四辺形になるための条件として正しいものはどれか。', g[0],
        ['1組の対辺が等しい', '対角線の長さが等しい', '対角線が垂直に交わる', '1組の対角が等しい'],
        g[1] + '(ほかの選択肢は、平行四辺形でない四角形でも成り立つことがあります。)');
    }
    if (t === 4){
      var ask = rand(0, 1);
      if (ask === 0) return mkCard('対角線の長さが必ず等しくなる四角形はどれか。', '長方形', ['ひし形', '平行四辺形', '台形'],
        '長方形は対角線の長さが等しい。ひし形や平行四辺形の対角線は一般には等しくありません。');
      return mkCard('対角線が必ず垂直に交わる四角形はどれか。', 'ひし形', ['長方形', '平行四辺形', '台形'],
        'ひし形は対角線が垂直に交わり、たがいに中点で交わります。長方形や平行四辺形では一般に垂直になりません。');
    }
    if (t === 5){
      var a = rand(45,135), q = pick(['B','C','D']);
      var v = q === 'C' ? a : 180 - a;
      var why = q === 'C' ? '平行四辺形の対角は等しいので ∠C = ∠A = ' + a + '°。' : '平行四辺形のとなり合う角の和は 180° なので、180° − ' + a + '° = ' + (180-a) + '°。';
      if (q === 'D') { v = 180 - a; why = '∠D は ∠A のとなりの角なので、180° − ' + a + '° = ' + (180-a) + '°。'; }
      return ang('平行四辺形 ABCD で、∠A = ' + a + '° のとき、∠' + q + ' の大きさは？', v, why);
    }
    if (t === 6){
      var p = rand(3,12), r = rand(3,12);
      return { kind:'text', text:'平行四辺形 ABCD で、AB = ' + p + ' cm、BC = ' + r + ' cm のとき、周の長さは？', explain:'対辺は等しいので、周の長さ = 2 × (' + p + ' + ' + r + ') = ' + (2*(p+r)) + ' cm。', answers:[{type:'int', value:2*(p+r), unit:'cm'}] };
    }
    if (t === 7){
      var ao = rand(3,12), bo = rand(3,12);
      var w = rand(0, 1);
      if (w === 0) return { kind:'text', text:'平行四辺形 ABCD の対角線 AC、BD の交点を O とする。AO = ' + ao + ' cm のとき、対角線 AC の長さは？', explain:'平行四辺形の対角線はそれぞれの中点で交わるので、AC = 2 × AO = ' + (2*ao) + ' cm。', answers:[{type:'int', value:2*ao, unit:'cm'}] };
      return { kind:'text', text:'平行四辺形 ABCD の対角線 AC、BD の交点を O とする。BD = ' + (2*bo) + ' cm のとき、OB の長さは？', explain:'対角線はそれぞれの中点で交わるので、OB = BD ÷ 2 = ' + bo + ' cm。', answers:[{type:'int', value:bo, unit:'cm'}] };
    }
    // 二等辺三角形の性質(逆を含む)
    var pool = [
      ['二等辺三角形で、等しい2辺の間にない2つの角(底角)について正しいものはどれか。', '2つの底角は等しい', ['2つの底角の和は 90° である', '2つの底角は、頂角の2倍である', '2つの底角は異なる大きさになる'], '二等辺三角形の底角は等しい、というのが基本の性質です。'],
      ['△ABC で ∠B = ∠C のとき、この三角形について正しくいえるものはどれか。', 'AB = AC の二等辺三角形である', ['AB = BC の二等辺三角形である', 'BC = CA の二等辺三角形である', '正三角形である'], '2つの角が等しい三角形は二等辺三角形で、等しい角の向かいの辺(AC と AB)が等しくなります。']
    ];
    var pp = pick(pool);
    return mkCard(pp[0], pp[1], pp[2], pp[3]);
  }

  registerMath('s_j2', [
    {id:'j2_shiki', name:'式の計算', gen:genShiki},
    {id:'j2_shikinoatai', name:'式の値と文字式の利用', gen:genShikiNoAtai},
    {id:'j2_rensei', name:'連立方程式', gen:genRensei},
    {id:'j2_ichiji', name:'一次関数', gen:genIchiji},
    {id:'j2_graph', name:'一次関数のグラフ', gen:genGraph},
    {id:'j2_kakudo', name:'図形の角度', gen:genKakudo},
    {id:'j2_kakuritsu', name:'確率', gen:genKakuritsu},
    {id:'j2_seishitsu', name:'三角形と四角形の性質・合同条件', gen:genSeishitsu}
  ]);
})();
