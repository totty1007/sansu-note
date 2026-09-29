/* 数学 高校 数学I・A (s_h1) 問題生成 */
(function(){
  const M='−';
  const X2='x'+sup(2);
  function num(n){ return n<0 ? M+(-n) : String(n); }
  function nz(x){ return x===0 ? 0 : x; }
  function rnz(a,b){ let v; do{ v=rand(a,b); }while(v===0); return v; }
  function term(c,v,first){
    const a=Math.abs(c);
    const body=(a===1&&v)?v:(a+v);
    if(first) return (c<0?M:'')+body;
    return ' '+(c<0?M:'+')+' '+body;
  }
  function pl(list){
    let s='';
    list.forEach(([c,v])=>{ if(c===0) return; s+=term(c,v,s===''); });
    return s||'0';
  }
  function quad(a,b,c,plain){ return pl([[a,plain?'x²':X2],[b,'x'],[c,'']]); }
  function lin(p,q){ return '('+pl([[p,'x'],[q,'']])+')'; }
  function facs(list){
    const l=list.slice().sort((u,v)=>(u[0]-v[0])||(u[1]-v[1]));
    return l.map(([p,q])=>lin(p,q)).join('');
  }
  function sqx(p,plain){
    const two=plain?'²':sup(2);
    if(p===0) return 'x'+two;
    return '(x '+(p>0?M+' '+p:'+ '+(-p))+')'+two;
  }
  function vf(a,p,q,plain){
    const pre=a===1?'':(a===-1?M:num(a));
    let s=pre+sqx(p,plain);
    if(q>0) s+=' + '+q; else if(q<0) s+=' '+M+' '+(-q);
    return s;
  }
  function pt(p,q){ return '('+num(p)+', '+num(q)+')'; }
  function nPr(n,r){ let v=1; for(let i=0;i<r;i++) v*=n-i; return v; }
  function sqrtInt(n){ const s=Math.round(Math.sqrt(n)); return s*s===n ? s : -1; }
  function cr(c,r){ return r===1 ? String(c) : (c===1?'':c)+sqrtHTML(r); }
  function radForm(n){
    let s=1;
    for(let i=2;i*i<=n;i++){ while(n%(i*i)===0){ n/=i*i; s*=i; } }
    return cr(s,n);
  }
  /* 確率の誤答: [分子,分母]の組から、0<p<1 かつ正解と同値でないものだけを分数HTMLにする */
  function pw(cn,cd,list){ return list.filter(([n,d])=>n>0&&n<d&&n*cd!==cn*d).map(([n,d])=>fracHTML(n,d)); }
  function uniq(arr){ const seen=new Set(); const out=[]; arr.forEach(x=>{ if(!seen.has(x)){ seen.add(x); out.push(x); } }); return out; }

  /* ---------- 三角比の値テーブル ---------- */
  const S2=sqrtHTML(2), S3=sqrtHTML(3);
  const POOL=[[0,'0']];
  function addP(n,h){ POOL.push([n,h]); POOL.push([-n,M+h]); }
  addP(0.5,fracHTMLRaw(1,2));
  addP(Math.SQRT2/2,fracHTMLRaw(S2,2));
  addP(Math.sqrt(3)/2,fracHTMLRaw(S3,2));
  addP(1,'1');
  addP(Math.sqrt(3)/3,fracHTMLRaw(S3,3));
  addP(Math.sqrt(3),S3);
  const ANGS=[0,30,45,60,90,120,135,150,180];
  function valNum(f,deg){
    if(f==='tan' && deg===90) return null;
    const r=deg*Math.PI/180;
    return f==='sin'?Math.sin(r):(f==='cos'?Math.cos(r):Math.tan(r));
  }
  function lookup(v){ const e=POOL.find(x=>Math.abs(x[0]-v)<1e-9); return e?e[1]:null; }
  function solveSet(f,v){ return ANGS.filter(a=>{ const w=valNum(f,a); return w!==null && Math.abs(w-v)<1e-9; }); }
  function setStr(S){ return S.map(a=>a+'°').join(', '); }
  const TRIPLES=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]];
  function valStr(pr){
    let [n,d]=pr; if(d<0){ n=-n; d=-d; }
    return (n<0?M:'')+fracHTML(Math.abs(n),d);
  }

  /* ---------- 余弦定理 角: 60°/120° になる3辺の一覧 ---------- */
  const COSLIST=[];
  for(let b=1;b<=15;b++){
    for(let c=b+1;c<=15;c++){
      [[b*b+c*c-b*c,60],[b*b+c*c+b*c,120]].forEach(([n,ang])=>{
        const a=sqrtInt(n);
        if(a>0) COSLIST.push({a,b,c,ang});
      });
    }
  }

  /* ---------- 必要条件・十分条件 ---------- */
  const NS_ANS={S:'十分条件であるが、必要条件ではない', N:'必要条件であるが、十分条件ではない', B:'必要十分条件である', X:'必要条件でも十分条件でもない'};
  function nsItem(){
    const k=rand(1,9);
    const t=rand(1,12);
    const pre='x, y は実数、n は整数とする。';
    if(t===1) return {pre, p:`x = ${k}`, q:`x${sup(2)} = ${k*k}`, rel:'S', fqp:`x = ${-k}`};
    if(t===2){ const d=rand(1,4); return {pre, p:`x > ${k+d}`, q:`x > ${k}`, rel:'S', fqp:`x = ${k+d}`}; }
    if(t===3){ const d=rand(2,5), m=rand(2,4); return {pre, p:`n は ${m*d} の倍数`, q:`n は ${d} の倍数`, rel:'S', fqp:`n = ${d}`}; }
    if(t===4) return {pre, p:'x > 0 かつ y > 0', q:'xy > 0', rel:'S', fqp:'x = −1, y = −1'};
    if(t===5) return {pre, p:`x${sup(2)} + y${sup(2)} = 0`, q:'x = 0 かつ y = 0', rel:'B'};
    if(t===6) return {pre, p:`x = ${k}`, q:`2x + 3 = ${2*k+3}`, rel:'B'};
    if(t===7) return {pre, p:'xy > 0', q:'x + y > 0', rel:'X', fpq:'x = −1, y = −2', fqp:'x = 3, y = −1'};
    if(t===8) return {pre, p:'x > 0', q:`x${sup(2)} > ${k*k}`, rel:'X', fpq:`x = ${k}`, fqp:`x = ${-(k+1)}`};
    if(t===9){
      let r1,r2; do{ r1=rnz(-5,5); r2=rnz(-5,5); }while(r1===r2);
      return {pre, p:`x = ${num(r1)}`, q:`${quad(1,-(r1+r2),r1*r2)} = 0`, rel:'S', fqp:`x = ${num(r2)}`};
    }
    if(t===10) return {pre, p:`x < ${k}`, q:`x${sup(2)} < ${k*k}`, rel:'N', fpq:`x = ${-(k+1)}`};
    if(t===11) return {pre:'', p:'四角形 ABCD は正方形', q:'四角形 ABCD は長方形', rel:'S', fqp:'長方形でも、隣り合う辺の長さが等しいとは限らない'};
    return {pre:'', p:'四角形 ABCD は平行四辺形', q:'四角形 ABCD はひし形', rel:'N', fpq:'平行四辺形でも、隣り合う辺の長さが等しいとは限らない'};
  }

  registerMath('s_h1', [

    /* ============ 1. 展開と因数分解 ============ */
    {id:'h1_inshu', name:'展開と因数分解', gen(){
      const t=pick(['exp','exp','sq','diff','fac1','fac1','fac2','fac2','fac3','fac4']);
      if(t==='exp'){
        const p=rand(1,3), r=rand(1,3), q=rnz(-6,6), s=rnz(-6,6);
        const A=p*r, B=p*s+q*r, C=q*s;
        return mkCard(`${lin(p,q)}${lin(r,s)} を展開せよ。`, quad(A,B,C),
          [quad(A,B,-C), quad(A,B,q+s), quad(A,p*s,C), quad(A,q*r,C), quad(A,-B,C)],
          `x${sup(2)}の係数は ${p}×${r}=${A}、xの係数は ${p}×${num(s)}+${num(q)}×${r}=${num(B)}、定数項は ${num(q)}×${num(s)}=${num(C)} です。`);
      }
      if(t==='sq'){
        const p=rand(1,3), q=rnz(-6,6);
        return mkCard(`${lin(p,q)}${sup(2)} を展開せよ。`, quad(p*p,2*p*q,q*q),
          [quad(p*p,p*q,q*q), quad(p*p,0,q*q), quad(p*p,-2*p*q,q*q), quad(p*p,2*p*q,-q*q)],
          `(a + b)${sup(2)} = a${sup(2)} + 2ab + b${sup(2)} を使います。中央の項は 2×${p}x×${num(q)} = ${num(2*p*q)}x です。`);
      }
      if(t==='diff'){
        const p=rand(1,3), q=rand(1,7);
        return mkCard(`${lin(p,q)}${lin(p,-q)} を展開せよ。`, quad(p*p,0,-q*q),
          [quad(p*p,0,q*q), quad(p*p,2*p*q,-q*q), quad(p*p,-2*p*q,q*q), quad(p,0,-q*q)],
          `(a + b)(a − b) = a${sup(2)} − b${sup(2)} を使います。(${p}x)${sup(2)} − ${q}${sup(2)} = ${quad(p*p,0,-q*q)} です。`);
      }
      if(t==='fac1'){
        let p,q; do{ p=rnz(-8,8); q=rnz(-8,8); }while(p===q||(p+q===0&&Math.abs(p)===1));
        return mkCard(`${quad(1,p+q,p*q)} を因数分解せよ。`, facs([[1,p],[1,q]]),
          [facs([[1,-p],[1,-q]]), facs([[1,p],[1,-q]]), facs([[1,-p],[1,q]]), facs([[1,1],[1,p*q]])],
          `足して ${num(p+q)}、かけて ${num(p*q)} になる 2 数は ${num(p)} と ${num(q)} です。`);
      }
      if(t==='fac2'){
        let p,q,r,s;
        do{ p=rand(1,3); r=rand(1,3); q=rnz(-6,6); s=rnz(-6,6); }while((p===1&&r===1)||gcd(p,q)!==1||gcd(r,s)!==1);
        return mkCard(`${quad(p*r,p*s+q*r,q*s)} を因数分解せよ。`, facs([[p,q],[r,s]]),
          [facs([[p,s],[r,q]]), facs([[p,-q],[r,-s]]), facs([[p,q],[r,-s]]), facs([[p,-q],[r,s]]), facs([[p*r,q],[1,s]]), facs([[p*r,s],[1,q]])],
          `たすき掛けで、x${sup(2)}の係数 ${p*r}=${p}×${r}、定数項 ${num(q*s)}=${num(q)}×${num(s)} とし、たすき掛けの和が ${p}×${num(s)}+${r}×${num(q)}=${num(p*s+q*r)} となる組を選びます。`);
      }
      if(t==='fac3'){
        const s=pick([1,-1]), p=rand(1,3), q=rand(1,4);
        const qs=s*q;
        const good=lin(p,qs)+'('+quad(p*p,-s*p*q,q*q)+')';
        return mkCard(`${pl([[p*p*p,'x'+sup(3)],[s*q*q*q,'']])} を因数分解せよ。`, good,
          [lin(p,qs)+'('+quad(p*p,s*p*q,q*q)+')', lin(p,-qs)+'('+quad(p*p,-s*p*q,q*q)+')', lin(p,qs)+'('+quad(p*p,-2*s*p*q,q*q)+')', lin(p,-qs)+'('+quad(p*p,s*p*q,q*q)+')'],
          s>0 ? `a${sup(3)} + b${sup(3)} = (a + b)(a${sup(2)} − ab + b${sup(2)}) で a = ${p===1?'':p}x, b = ${q} とします。`
              : `a${sup(3)} − b${sup(3)} = (a − b)(a${sup(2)} + ab + b${sup(2)}) で a = ${p===1?'':p}x, b = ${q} とします。`);
      }
      // fac4: 共通因数
      let p,q; do{ p=rnz(-6,6); q=rnz(-6,6); }while(p===q);
      const k=rand(2,5);
      return mkCard(`${quad(k,k*(p+q),k*p*q)} を因数分解せよ。`, k+facs([[1,p],[1,q]]),
        [facs([[1,p],[1,q]]), k+facs([[1,-p],[1,-q]]), k+facs([[1,p],[1,-q]]), k+facs([[1,-p],[1,q]])],
        `まず共通因数 ${k} でくくると ${k}(${quad(1,p+q,p*q)}) となり、かっこの中を因数分解します。`);
    }},

    /* ============ 2. 二次関数 ============ */
    {id:'h1_nijikansu', name:'二次関数(頂点・最大最小・共有点)', gen(){
      const t=pick(['vtx','kansei','kansei','minmaxfree','minmaxrange','minmaxrange','xint','shift','findA']);
      if(t==='vtx'){
        const a=pick([1,2,3,-1,-2,-3]), p=rnz(-5,5), q=rnz(-8,8);
        return mkCard(`2次関数 y = ${vf(a,p,q)} のグラフの頂点の座標は？`, pt(p,q),
          [pt(-p,q), pt(p,-q), pt(-p,-q), pt(q,p)],
          `y = a(x − p)${sup(2)} + q のグラフの頂点は (p, q) です。${p<0?`x + ${-p} = x − (${num(p)}) なので x 座標は ${num(p)} です。`:`x 座標は ${p} です。`}`);
      }
      if(t==='kansei'){
        const a=pick([1,1,2,-1,-2]), p=rnz(-4,4), q=rnz(-9,9);
        const b=-2*a*p, c=a*p*p+q;
        const ex=`y = ${quad(a,b,c)}`;
        const ask=pick(['form','vertex','axis']);
        const expl=`平方完成すると y = ${vf(a,p,q)}。頂点は ${pt(p,q)}、軸は直線 x = ${num(p)} です。`;
        if(ask==='form'){
          return mkCard(`2次関数 ${ex} を y = a(x − p)${sup(2)} + q の形に変形せよ。`, 'y = '+vf(a,p,q),
            ['y = '+vf(a,-p,q), 'y = '+vf(a,p,c), 'y = '+vf(a,p,-q), 'y = '+vf(a,-p,c)], expl);
        }
        if(ask==='vertex'){
          return mkCard(`2次関数 ${ex} のグラフの頂点の座標は？`, pt(p,q),
            [pt(-p,q), pt(p,c), pt(-p,c), pt(p,-q)], expl);
        }
        return mkCard(`2次関数 ${ex} のグラフの軸の方程式は？`, 'x = '+num(p),
          ['x = '+num(-p), 'x = '+num(2*p), 'x = '+num(p+1), 'x = '+num(p-1)], expl);
      }
      if(t==='minmaxfree'){
        const a=pick([1,2,3,-1,-2,-3]), p=rnz(-4,4), q=rnz(-9,9);
        const b=-2*a*p, c=a*p*p+q;
        const isMin=a>0;
        return { kind:'text', text:`2次関数 y = ${quad(a,b,c,true)} の${isMin?'最小値':'最大値'}を求めよ。`,
          explain:`平方完成すると y = ${vf(a,p,q)}。x${sup(2)}の係数が${a>0?'正':'負'}なので、x = ${num(p)} のとき${isMin?'最小値':'最大値'} ${num(q)} をとります。`,
          answers:[{type:'int', value:nz(q)}] };
      }
      if(t==='minmaxrange'){
        const a=pick([1,2,-1,-2,3]), p=rnz(-3,4), q=rnz(-6,6);
        const b=-2*a*p, c=a*p*p+q;
        const m=rand(-3,2), n=m+rand(2,5);
        const f=x=>a*(x-p)*(x-p)+q;
        const cand=[f(m),f(n)];
        const inside=(m<=p && p<=n);
        if(inside) cand.push(q);
        const isMax=Math.random()<0.5;
        const ans=isMax?Math.max(...cand):Math.min(...cand);
        return { kind:'text', text:`2次関数 y = ${quad(a,b,c,true)}（${num(m)} ≦ x ≦ ${num(n)}）の${isMax?'最大値':'最小値'}を求めよ。`,
          explain:`平方完成すると y = ${vf(a,p,q)}。頂点の x 座標 ${num(p)} は範囲に${inside?'含まれます':'含まれません'}。x = ${num(m)} のとき y = ${num(f(m))}、x = ${num(n)} のとき y = ${num(f(n))}${inside?`、x = ${num(p)} のとき y = ${num(q)}`:''}。よって${isMax?'最大値':'最小値'}は ${num(ans)} です。`,
          answers:[{type:'int', value:nz(ans)}] };
      }
      if(t==='xint'){
        const a=pick([1,1,-1,2]);
        let r1,r2; do{ r1=rnz(-6,6); r2=rnz(-6,6); }while(r1===r2||r1+r2===0);
        const xs=(u,v)=>{ const [s,w]=u<v?[u,v]:[v,u]; return `x = ${num(s)}, ${num(w)}`; };
        const pre=a===1?'':(a===-1?M:String(a));
        return mkCard(`2次関数 y = ${quad(a,-a*(r1+r2),a*r1*r2)} のグラフと x 軸との共有点の x 座標をすべて求めよ。`, xs(r1,r2),
          [xs(-r1,-r2), xs(r1,-r2), xs(-r1,r2), xs(r1+r2,r1*r2)],
          `y = 0 とおくと ${pre}${facs([[1,-r1],[1,-r2]])} = 0。よって ${xs(r1,r2)} です。`);
      }
      if(t==='shift'){
        const a=pick([1,2,-1,3]), p=rnz(-4,4), q=rnz(-5,5);
        return mkCard(`放物線 y = ${pl([[a,X2]])} を x 軸方向に ${num(p)}、y 軸方向に ${num(q)} だけ平行移動したグラフの式は？`, 'y = '+vf(a,p,q),
          ['y = '+vf(a,-p,q), 'y = '+vf(a,p,-q), 'y = '+vf(a,-p,-q)],
          `頂点 (0, 0) が ${pt(p,q)} に移るので、y = ${vf(a,p,q)} となります。x 軸方向の移動量 ${num(p)} は (x − (${num(p)})) の形で入ります。`);
      }
      // findA
      const a=pick([-3,-2,-1,1,2,3]), p=rnz(-3,3), q=rnz(-5,5);
      let r; do{ r=rand(-3,5); }while(r===p);
      const s=a*(r-p)*(r-p)+q;
      const q2=q>0?` + ${q}`:(q<0?` ${M} ${-q}`:'');
      return { kind:'text', text:`放物線 y = a${sqx(p,true)}${q2}（a は定数）が点 (${num(r)}, ${num(s)}) を通るとき、a の値を求めよ。`,
        explain:`x = ${num(r)}, y = ${num(s)} を代入すると ${num(s)} = a×${(r-p)*(r-p)}${q2}。よって a×${(r-p)*(r-p)} = ${num(s-q)} で a = ${num(a)} です。`,
        answers:[{type:'int', value:a}] };
    }},

    /* ============ 3. 二次方程式・判別式 ============ */
    {id:'h1_hanbetsu', name:'二次方程式・判別式・解と係数', gen(){
      const t=pick(['cnt','cnt','disc','formula','formula','factor2','vieta','vieta','findmn','kdouble','krange']);
      if(t==='cnt' || t==='disc'){
        const type=pick([0,1,2]);
        let a,b,c;
        if(t==='disc'){
          a=pick([1,2,3,-1,-2]); b=rand(-8,8); c=rand(-8,8);
          const D=b*b-4*a*c;
          return { kind:'text', text:`2次方程式 ${quad(a,b,c,true)} = 0 の判別式 D = b² − 4ac の値を求めよ。`,
            explain:`D = (${num(b)})² − 4×(${num(a)})×(${num(c)}) = ${num(b*b)} − (${num(4*a*c)}) = ${num(D)}`,
            answers:[{type:'int', value:nz(D)}] };
        }
        if(type===1){ a=pick([1,2,3,-1,-2]); const m=rnz(-3,3); b=2*a*m; c=a*m*m; }
        else{
          do{ a=pick([1,1,2,3,-1,-2]); b=rand(-8,8); c=rand(-8,8); }while(!(type===2 ? b*b-4*a*c>0 : b*b-4*a*c<0));
        }
        const D=b*b-4*a*c;
        const ans=D>0?'2個':(D===0?'1個':'0個');
        const wr=['0個','1個','2個','3個'].filter(x=>x!==ans);
        return mkCard(`2次方程式 ${quad(a,b,c)} = 0 の実数解の個数は？`, ans, wr,
          `D = (${num(b)})² − 4×(${num(a)})×(${num(c)}) = ${num(D)}。D ${D>0?'> 0 なので異なる 2 つの実数解':(D===0?'= 0 なので重解 (実数解は 1 個)':'< 0 なので実数解はなし')}です。`);
      }
      if(t==='formula'){
        if(Math.random()<0.5){
          const k=rnz(-5,5), m=pick([2,3,5,6,7,10,11]);
          const c=k*k-m;
          return mkCard(`2次方程式 ${quad(1,2*k,c)} = 0 を解け。`, `x = ${num(-k)} ± ${sqrtHTML(m)}`,
            [`x = ${num(k)} ± ${sqrtHTML(m)}`, `x = ${num(-2*k)} ± ${sqrtHTML(m)}`, `x = ${num(-k)} ± 2${sqrtHTML(m)}`, `x = ${num(-k)} ± ${sqrtHTML(m+k*k)}`],
            `x の係数が偶数 (2×${num(k)}) なので、x = −b' ± √(b'² − ac) を使います。b' = ${num(k)} より x = ${num(-k)} ± √(${k*k} − (${num(c)})) = ${num(-k)} ± ${sqrtHTML(m)} です。`);
        }
        const b=pick([-7,-5,-3,-1,1,3,5,7]), D=pick([5,13,17,21,29,33,37]);
        const c=(b*b-D)/4;
        return mkCard(`2次方程式 ${quad(1,b,c)} = 0 を解け。`, 'x = '+fracHTMLRaw(`${num(-b)} ± ${sqrtHTML(D)}`,2),
          ['x = '+fracHTMLRaw(`${num(b)} ± ${sqrtHTML(D)}`,2), 'x = '+fracHTMLRaw(`${num(-b)} ± ${sqrtHTML(D)}`,4), `x = ${num(-b)} ± `+fracHTMLRaw(sqrtHTML(D),2), `x = ${num(-b)} ± ${sqrtHTML(D)}`],
          `解の公式 x = (−b ± √(b² − 4ac)) / 2a より、b² − 4ac = (${num(b)})² − 4×${num(c)} = ${D}。x = (${num(-b)} ± √${D}) / 2 です。`);
      }
      if(t==='factor2'){
        let p,q,r,s;
        do{ p=pick([1,1,2,3]); r=pick([1,2,3]); q=rnz(-6,6); s=rnz(-6,6); }while(gcd(p,q)!==1||gcd(r,s)!==1||q*r===s*p);
        const rs=(n,d)=>{ if(d<0){ n=-n; d=-d; } return (n<0?M:'')+fracHTML(Math.abs(n),d); };
        const mk=(A,B)=>{
          const x=(A[0]*B[1]<B[0]*A[1])?[A,B]:[B,A];
          return 'x = '+rs(x[0][0],x[0][1])+', '+rs(x[1][0],x[1][1]);
        };
        return mkCard(`2次方程式 ${quad(p*r,p*s+q*r,q*s)} = 0 を解け。`, mk([-q,p],[-s,r]),
          [mk([q,p],[s,r]), mk([-q,r],[-s,p]), mk([-p,q],[-r,s]), mk([q,p],[-s,r]), mk([-q,p],[s,r]), mk([-(q+1),p],[-s,r]), mk([-q,p],[-(s+1),r])],
          `左辺を因数分解すると ${lin(p,q)}${lin(r,s)} = 0。よって ${lin(p,q)} = 0 または ${lin(r,s)} = 0 から ${mk([-q,p],[-s,r])} です。`);
      }
      if(t==='vieta'){
        let b,c,D;
        do{ b=rnz(-7,7); c=rand(-8,8); D=b*b-4*c; }while(D<=0);
        const eq=`${quad(1,b,c,true)} = 0`;
        const kind=pick(['sq','cube','shift','diff']);
        let txt,ans,ex;
        const sm=-b, pr=c;
        if(kind==='sq'){ txt='α² + β²'; ans=sm*sm-2*pr; ex=`α + β = ${num(sm)}、αβ = ${num(pr)}。α² + β² = (α + β)² − 2αβ = ${sm*sm} − 2×(${num(pr)}) = ${num(ans)}`; }
        else if(kind==='cube'){ txt='α³ + β³'; ans=sm*sm*sm-3*pr*sm; ex=`α + β = ${num(sm)}、αβ = ${num(pr)}。α³ + β³ = (α + β)³ − 3αβ(α + β) = ${num(sm*sm*sm)} − 3×(${num(pr)})×(${num(sm)}) = ${num(ans)}`; }
        else if(kind==='shift'){ txt='(α + 1)(β + 1)'; ans=pr+sm+1; ex=`α + β = ${num(sm)}、αβ = ${num(pr)}。(α + 1)(β + 1) = αβ + (α + β) + 1 = ${num(pr)} + (${num(sm)}) + 1 = ${num(ans)}`; }
        else{ txt='(α − β)²'; ans=sm*sm-4*pr; ex=`α + β = ${num(sm)}、αβ = ${num(pr)}。(α − β)² = (α + β)² − 4αβ = ${sm*sm} − 4×(${num(pr)}) = ${num(ans)}`; }
        return { kind:'text', text:`2次方程式 ${eq} の 2 つの解を α, β とするとき、${txt} の値を求めよ。`, explain:ex, answers:[{type:'int', value:nz(ans)}] };
      }
      if(t==='findmn'){
        let p,q; do{ p=rnz(-6,6); q=rnz(-6,6); }while(p===q);
        const m=-(p+q), n=p*q;
        return { kind:'text', text:`2次方程式 x² + mx + n = 0 の 2 つの解が ${num(p)} と ${num(q)} であるとき、m + n の値を求めよ。`,
          explain:`解と係数の関係より、和 ${num(p)} + (${num(q)}) = −m なので m = ${num(m)}。積 ${num(p)}×(${num(q)}) = n なので n = ${num(n)}。よって m + n = ${num(m+n)} です。`,
          answers:[{type:'int', value:nz(m+n)}] };
      }
      if(t==='kdouble'){
        const m=rand(2,8), c=m*m;
        return { kind:'text', text:`2次方程式 x² + kx + ${c} = 0 が重解をもつとき、正の定数 k の値を求めよ。`,
          explain:`重解をもつのは D = 0 のとき。D = k² − 4×${c} = 0 より k² = ${4*c}、k = ±${2*m}。k > 0 なので k = ${2*m} です。`,
          answers:[{type:'int', value:2*m}] };
      }
      // krange
      const a=rnz(-5,5), N=a*a;
      const variant=pick(['two','none','real']);
      const desc={two:'異なる2つの実数解をもつ', none:'実数解をもたない', real:'実数解をもつ'}[variant];
      const ansT={two:`k < ${N}`, none:`k > ${N}`, real:`k ≦ ${N}`}[variant];
      const all=[`k < ${N}`, `k > ${N}`, `k ≦ ${N}`, `k ≧ ${N}`];
      const dcond={two:'D/4 > 0', none:'D/4 < 0', real:'D/4 ≧ 0'}[variant];
      return mkCard(`2次方程式 ${pl([[1,X2],[2*a,'x'],[1,'k']])} = 0 が${desc}ような定数 k の範囲は？`, ansT, all.filter(x=>x!==ansT),
        `D/4 = (${num(a)})² − k = ${N} − k。${desc}条件は ${dcond} なので ${N} − k ${variant==='two'?'> 0':(variant==='none'?'< 0':'≧ 0')}、よって ${ansT} です。`);
    }},

    /* ============ 4. 二次不等式 ============ */
    {id:'h1_futoushiki', name:'二次不等式', gen(){
      const t=pick(['main','main','main','special','intcount','coeff']);
      const ineqAns=(p,q,inside,strict)=>{
        const lt=strict?'<':'≦';
        return inside ? `${num(p)} ${lt} x ${lt} ${num(q)}` : `x ${lt} ${num(p)}, ${num(q)} ${lt} x`;
      };
      if(t==='main'){
        const a=pick([1,1,-1,2,-2]);
        let p,q; do{ p=rand(-6,6); q=rand(-6,6); }while(p>=q||p+q===0);
        const op=pick(['>','≧','<','≦']);
        const strict=(op==='<'||op==='>');
        const less=(op==='<'||op==='≦');
        const inside=(a>0)?less:!less;
        const ans=ineqAns(p,q,inside,strict);
        const pre=a===1?'':(a===-1?M:String(a));
        return mkCard(`2次不等式 ${quad(a,-a*(p+q),a*p*q)} ${op} 0 を解け。`, ans,
          [ineqAns(p,q,!inside,strict), ineqAns(-q,-p,inside,strict), ineqAns(-q,-p,!inside,strict), ineqAns(p,q,inside,!strict), ineqAns(p,q,!inside,!strict)],
          `左辺を因数分解すると ${pre}${facs([[1,-p],[1,-q]])} ${op} 0${a<0?`。両辺に −1 をかけて不等号の向きを変えると (x − (${num(p)}))(x − (${num(q)})) ${ ({'>':'<','≧':'≦','<':'>','≦':'≧'})[op] } 0`:''}。解は ${ans} です。`);
      }
      if(t==='special'){
        const a=pick([1,-1]), p=rnz(-6,6);
        const op=pick(['>','≧','<','≦']);
        const eff=a>0?op:({'>':'<','≧':'≦','<':'>','≦':'≧'})[op];
        const map={'>':`x = ${num(p)} 以外のすべての実数`, '≧':'すべての実数', '<':'解なし', '≦':`x = ${num(p)}`};
        const all=Object.values(map);
        const ans=map[eff];
        return mkCard(`2次不等式 ${quad(a,-2*a*p,a*p*p)} ${op} 0 を解け。`, ans, all.filter(x=>x!==ans),
          `${a>0?'':'両辺に −1 をかけて不等号の向きを変えると、'}(x − (${num(p)}))${sup(2)} ${eff} 0 となります。${{'>':`(x − (${num(p)}))${sup(2)} は 0 以上で、x = ${num(p)} のときだけ 0 です。`,'≧':'2乗は常に 0 以上です。','<':'2乗が負になることはありません。','≦':`2乗が 0 以下になるのは 0 のときだけです。`}[eff]}`);
      }
      if(t==='intcount'){
        let p,q; do{ p=rand(-5,4); q=p+rand(3,8); }while(q>7);
        const strict=Math.random()<0.5;
        const cnt=strict ? q-p-1 : q-p+1;
        return { kind:'text', text:`2次不等式 ${quad(1,-(p+q),p*q,true)} ${strict?'<':'≦'} 0 を満たす整数 x は全部で何個あるか。`,
          explain:`(x − (${num(p)}))(x − (${num(q)})) ${strict?'<':'≦'} 0 より ${strict?`${num(p)} < x < ${num(q)}`:`${num(p)} ≦ x ≦ ${num(q)}`}。この範囲の整数は ${cnt} 個です。`,
          answers:[{type:'int', value:cnt, unit:'個'}] };
      }
      // coeff
      let p,q; do{ p=rnz(-5,5); q=rnz(-5,5); }while(p>=q);
      const b=-(p+q), c=p*q;
      return { kind:'text', text:`2次不等式 x² + bx + c < 0 の解が ${num(p)} < x < ${num(q)} であるとき、定数 b, c について b + c の値を求めよ。`,
        explain:`解が ${num(p)} < x < ${num(q)} で x² の係数が 1 の不等式は (x − (${num(p)}))(x − (${num(q)})) < 0。展開すると ${quad(1,b,c,true)} < 0 なので b = ${num(b)}, c = ${num(c)}、b + c = ${num(b+c)} です。`,
        answers:[{type:'int', value:nz(b+c)}] };
    }},

    /* ============ 5. 三角比 ============ */
    {id:'h1_sankakuhi', name:'三角比(値・相互関係・鈍角)', gen(){
      const t=pick(['value','value','rel','rel','angle','app']);
      if(t==='value'){
        const f=pick(['sin','cos','tan']);
        let ang; do{ ang=pick(ANGS); }while(f==='tan'&&ang===90);
        const v=valNum(f,ang);
        const good=lookup(v);
        const cands=[];
        ['sin','cos','tan'].filter(g=>g!==f).forEach(g=>{ const w=valNum(g,ang); if(w!==null) cands.push(w); });
        cands.push(-v);
        const w2=valNum(f,180-ang); if(w2!==null) cands.push(w2);
        shuffle(POOL).forEach(e=>cands.push(e[0]));
        const wrongs=uniq(cands.filter(x=>Math.abs(x-v)>1e-9).map(lookup).filter(x=>x!==null&&x!==good));
        let ex;
        if(ang>90&&ang<180){
          const sgn=f==='sin'?'':M;
          ex=`鈍角は 180° − ${ang}° = ${180-ang}° を使います。${f} θ = ${sgn?sgn+' ':''}${f}(180° − θ) の関係（sin は同じ、cos と tan は符号が逆）より、${f} ${ang}° = ${sgn}${f} ${180-ang}° = ${good} です。`;
        }else{
          ex=`基本の値を使います。${f} ${ang}° = ${good} です。`;
        }
        return mkCard(`${f} ${ang}° の値は？`, good, wrongs, ex);
      }
      if(t==='rel'){
        const [x,y,hyp]=pick(TRIPLES);
        const [opp,adj]=Math.random()<0.5?[x,y]:[y,x];
        const obt=Math.random()<0.5;
        const sg=obt?-1:1;
        const V={sin:[opp,hyp], cos:[sg*adj,hyp], tan:[sg*opp,adj]};
        const fns=['sin','cos','tan'];
        const g=pick(fns);
        const h=pick(fns.filter(x=>x!==g));
        const corr=V[h];
        const cross=(u,w)=>u[0]*w[1]===w[0]*u[1];
        const neg=u=>[-u[0],u[1]];
        const rec=u=>u[0]<0?[-u[1],-u[0]]:[u[1],u[0]];
        const goodS=valStr(corr);
        let cands=[neg(corr), rec(corr)];
        const rest=[];
        fns.forEach(k=>{ rest.push(V[k], neg(V[k]), rec(V[k])); });
        cands=cands.concat(shuffle(rest));
        const wrongs=uniq(cands.filter(u=>!cross(u,corr)).map(valStr).filter(s=>s!==goodS));
        return mkCard(`${obt?'90° < θ < 180°':'0° < θ < 90°'} で ${g} θ = ${valStr(V[g])} のとき、${h} θ の値は？`, goodS, wrongs,
          `sin²θ + cos²θ = 1 と tan θ = sin θ / cos θ を使います。辺の比 ${opp}:${adj}:${hyp} の直角三角形を考えると、${h} θ = ${goodS} です。${obt?'鈍角なので sin θ > 0、cos θ < 0、tan θ < 0 です。':''}`);
      }
      if(t==='angle'){
        const f=pick(['sin','cos','tan']);
        const ang0=pick([30,45,60,120,135,150]);
        const v=valNum(f,ang0);
        const S=solveSet(f,v);
        const good=setStr(S);
        const pool=[];
        if(S.length===2){ pool.push(S[0]+'°'); pool.push(S[1]+'°'); }
        ['sin','cos','tan'].forEach(g=>{ [v,-v].forEach(w=>{ if(!(g===f&&w===v)){ const s=solveSet(g,w); if(s.length) pool.push(setStr(s)); } }); });
        shuffle([30,45,60,120,135,150]).forEach(a=>{ const s=solveSet(f,valNum(f,a)); pool.push(setStr(s)); });
        const wrongs=uniq(pool.filter(x=>x!==good));
        const ex=f==='sin'
          ? `sin θ = sin(180° − θ) なので、鋭角の解 ${S[0]<=90?S[0]:180-S[0]}° のほかに 180° − ${S[0]<=90?S[0]:180-S[0]}° も解です。θ = ${good}。`
          : `0° ≦ θ ≦ 180° の範囲では ${f} θ の値は θ ごとに 1 つに決まるので、θ = ${good} です。`;
        return mkCard(`0° ≦ θ ≦ 180° のとき、${f} θ = ${lookup(v)} を満たす θ をすべて求めよ。`, good, wrongs, ex);
      }
      // app: 仰角
      const k=rand(1,6);
      const ang=pick([30,45,60]);
      const d=3*k;
      const ans=ang===30?cr(k,3):(ang===45?cr(3*k,1):cr(3*k,3));
      const wr=uniq([cr(k,3),cr(3*k,1),cr(3*k,3),cr(k,1),cr(9*k,1),cr(k,2)].filter(x=>x!==ans));
      return mkCard(`木の根元から水平に ${d} m 離れた地点から木の先端を見ると、仰角が ${ang}° であった。目の高さを無視すると、木の高さは何 m か。`, ans+' m', wr.map(x=>x+' m'),
        `木の高さ = ${d} × tan ${ang}° です。tan ${ang}° = ${ang===30?'√3/3':(ang===45?'1':'√3')} なので、高さは ${ans} m です。`);
    }},

    /* ============ 6. 正弦定理・余弦定理 ============ */
    {id:'h1_teiri', name:'正弦定理・余弦定理', gen(){
      const t=pick(['R','side','cosSide','cosSide','cosAngle','area']);
      if(t==='R'){
        const k=rand(1,8);
        const A=pick([30,150,45,135,60,120]);
        const kk=k===1?'':String(k);
        const a=(A===30||A===150)?`${k}`:((A===45||A===135)?`${kk}√2`:`${kk}√3`);
        const sinS={30:'1/2',150:'1/2',45:'√2/2',135:'√2/2',60:'√3/2',120:'√3/2'}[A];
        return { kind:'text', text:`△ABC において、BC = ${a}、∠A = ${A}° のとき、外接円の半径 R を求めよ。`,
          explain:`正弦定理 BC / sin A = 2R より、2R = ${a} ÷ (${sinS}) = ${2*k}。よって R = ${k} です。`,
          answers:[{type:'int', value:k}] };
      }
      if(t==='side'){
        const FORM={30:[1,1],45:[1,2],60:[1,3],90:[2,1]};
        const SIN={30:'1/2',45:'√2/2',60:'√3/2',90:'1'};
        const angs=[30,45,60,90];
        const A=pick(angs), B=pick(angs.filter(x=>x!==A));
        const k=rand(1,6);
        const [cA,rA]=FORM[A], [cB,rB]=FORM[B];
        const a=cr(k*cA,rA), ans=cr(k*cB,rB);
        const all=[[1,1],[1,2],[1,3],[2,1],[2,2],[2,3]].map(([c,r])=>cr(k*c,r));
        const wr=uniq(all.filter(x=>x!==ans));
        return mkCard(`△ABC において、∠A = ${A}°、∠B = ${B}°、BC = ${a} のとき、CA の長さは？`, ans,
          [a===ans?'':a].concat(wr).filter(x=>x!==''),
          `正弦定理 BC / sin A = CA / sin B より、外接円の半径を R とすると BC = 2R sin ${A}° から R = ${k}。CA = 2R sin ${B}° = 2×${k}×(${SIN[B]}) = ${ans} です。`);
      }
      if(t==='cosSide'){
        const mode=pick(['a','a','b']);
        let a,b,C,base,tt,obt;
        C=pick([60,120,45,135]);
        obt=(C===120||C===135);
        let bTxt,b2;
        if(C===60||C===120){
          do{ a=rand(2,10); b=rand(2,10); }while(a===b);
          bTxt=String(b); b2=b*b; tt=a*b;
        }else{
          a=rand(2,9); b=rand(1,6);
          bTxt=(b===1?'':String(b))+'√2'; b2=2*b*b; tt=2*a*b;
        }
        base=a*a+b2;
        const c2=obt?base+tt:base-tt;
        const good=radForm(c2);
        const cs=[base, obt?base-tt:base+tt, obt?base+2*tt:base+2*tt, obt?base-2*tt:base-2*tt, base+tt, base-tt].filter(x=>x>0&&x!==c2);
        const wr=uniq(cs.map(radForm)).filter(x=>x!==good);
        const cosS={60:'1/2',120:'−1/2',45:'√2/2',135:'−√2/2'}[C];
        return mkCard(`△ABC において、BC = ${a}、CA = ${bTxt.replace('√2',sqrtHTML(2))}、∠C = ${C}° のとき、AB の長さは？`, good, wr,
          `余弦定理より AB² = BC² + CA² − 2·BC·CA·cos C = ${a*a} + ${b2} − 2×${a}×${bTxt}×(${cosS}) = ${c2}。AB > 0 なので AB = ${good} です。`);
      }
      if(t==='cosAngle'){
        const it=pick(COSLIST);
        const V=pick(['A','B','C']);
        const opp={A:'BC',B:'CA',C:'AB'};
        const others=shuffle(['A','B','C'].filter(x=>x!==V));
        const len={}; len[V]=it.a; len[others[0]]=it.b; len[others[1]]=it.c;
        const b=len[others[0]], c=len[others[1]];
        const ans=it.ang+'°';
        const cosS=(it.ang===120?M:'')+fracHTML(1,2);
        const wr=uniq([(180-it.ang)+'°','30°','150°','90°','45°'].filter(x=>x!==ans));
        return mkCard(`△ABC において、BC = ${len.A}、CA = ${len.B}、AB = ${len.C} のとき、∠${V} の大きさは？`, ans, wr,
          `余弦定理より cos ${V} = (${b}² + ${c}² − ${it.a}²) ÷ (2×${b}×${c}) = ${(b*b+c*c-it.a*it.a)} / ${2*b*c} = ${cosS}。0° < ${V} < 180° なので ${V} = ${ans} です。`);
      }
      // area
      const C=pick([30,150,45,135,60,120]);
      let a,b; do{ a=rand(2,12); b=rand(2,12); }while((a*b)%4!==0);
      const m=a*b/4;
      const good=(C===30||C===150)?cr(m,1):((C===45||C===135)?cr(m,2):cr(m,3));
      const wr=uniq([cr(m,1),cr(m,2),cr(m,3),cr(2*m,1),cr(2*m,2),cr(2*m,3)].filter(x=>x!==good));
      const sinS={30:'1/2',150:'1/2',45:'√2/2',135:'√2/2',60:'√3/2',120:'√3/2'}[C];
      return mkCard(`△ABC において、AB = ${a}、AC = ${b}、∠A = ${C}° のとき、面積 S は？`, good, wr,
        `S = (1/2)·AB·AC·sin A = (1/2)×${a}×${b}×(${sinS}) = ${good} です。`);
    }},

    /* ============ 7. 場合の数・順列・組合せ ============ */
    {id:'h1_baai', name:'場合の数・順列・組合せ', gen(){
      const t=pick(['perm','comb','mix','circ','circAdj','dup','adj','notAdj','ends','digits','digits0','diag','tri','path']);
      const R=(text,ans,explain,unit)=>({ kind:'text', text, explain, answers:[{type:'int', value:ans, unit:unit||'通り'}] });
      const f=factorial;
      if(t==='perm'){
        const n=rand(5,9), r=rand(2,4);
        const seq=Array.from({length:r},(_,i)=>n-i).join(' × ');
        return R(`${n} 人の中から ${r} 人を選んで、1 列に並べる並び方は何通りですか。`, nPr(n,r), `${n}P${r} = ${seq} = ${nPr(n,r)}`);
      }
      if(t==='comb'){
        const n=rand(6,12), r=rand(2,4);
        return R(`${n} 個の異なる玉から ${r} 個を選ぶ選び方は何通りですか。`, nCk(n,r), `${n}C${r} = ${n}P${r} ÷ ${r}! = ${nPr(n,r)} ÷ ${f(r)} = ${nCk(n,r)}`);
      }
      if(t==='mix'){
        const b=rand(3,6), g=rand(3,5);
        if(Math.random()<0.5){
          return R(`男子 ${b} 人、女子 ${g} 人の中から、男子 2 人と女子 2 人を選ぶ選び方は何通りですか。`, nCk(b,2)*nCk(g,2), `男子の選び方 ${b}C2 = ${nCk(b,2)} 通り、女子の選び方 ${g}C2 = ${nCk(g,2)} 通り。積の法則より ${nCk(b,2)}×${nCk(g,2)} = ${nCk(b,2)*nCk(g,2)} 通りです。`);
        }
        const ans=nCk(b+g,3)-nCk(b,3)-nCk(g,3);
        return R(`男子 ${b} 人、女子 ${g} 人の中から 3 人を選ぶとき、男子も女子も少なくとも 1 人ずつ入る選び方は何通りですか。`, ans, `全体 ${b+g}C3 = ${nCk(b+g,3)} 通りから、男子だけ ${b}C3 = ${nCk(b,3)} 通りと女子だけ ${g}C3 = ${nCk(g,3)} 通りを引いて ${ans} 通りです。`);
      }
      if(t==='circ'){
        const n=rand(4,8);
        return R(`${n} 人が円形のテーブルに座る座り方は何通りですか。ただし、回転して同じになるものは同じとみなします。`, f(n-1), `円順列は (n − 1)! 通りです。(${n} − 1)! = ${f(n-1)}`);
      }
      if(t==='circAdj'){
        const n=rand(4,7);
        return R(`${n} 人が円形のテーブルに座るとき、A さんと B さんが隣り合う座り方は何通りですか。ただし、回転して同じになるものは同じとみなします。`, 2*f(n-2), `A, B をひとまとめにすると ${n-1} 個の円順列で (${n-1}−1)! = ${f(n-2)} 通り。A, B の入れかえが 2 通りなので 2×${f(n-2)} = ${2*f(n-2)} 通りです。`);
      }
      if(t==='dup'){
        const v=pick(['digit','janken','coin']);
        if(v==='digit'){
          const m=rand(2,5), n=rand(2,4);
          return R(`${m} 個の数字 1, 2, …, ${m} を重複して使ってよいとき、${n} 桁の整数は何個できますか。`, Math.pow(m,n), `各位に ${m} 通りずつ選べるので ${m}${sup(n)} = ${Math.pow(m,n)} 個です。`, '個');
        }
        if(v==='janken'){
          const k=rand(2,5);
          return R(`${k} 人でじゃんけんをするとき、手の出し方は全部で何通りですか。`, Math.pow(3,k), `1 人あたり 3 通りなので 3${sup(k)} = ${Math.pow(3,k)} 通りです。`);
        }
        const n=rand(3,6);
        return R(`${n} 枚のコインを投げるとき、表裏の出方は全部で何通りですか。ただし、コインは区別できるものとします。`, Math.pow(2,n), `1 枚あたり 2 通りなので 2${sup(n)} = ${Math.pow(2,n)} 通りです。`);
      }
      if(t==='adj'){
        const n=rand(4,6);
        return R(`${n} 人が 1 列に並ぶとき、A さんと B さんが隣り合う並び方は何通りですか。`, 2*f(n-1), `A, B をひとまとめにして ${n-1} 個を並べる ${f(n-1)} 通りに、A, B の入れかえ 2 通りをかけて ${2*f(n-1)} 通りです。`);
      }
      if(t==='notAdj'){
        const n=rand(4,6);
        return R(`${n} 人が 1 列に並ぶとき、A さんと B さんが隣り合わない並び方は何通りですか。`, f(n)-2*f(n-1), `全体 ${n}! = ${f(n)} 通りから、隣り合う 2×${f(n-1)} = ${2*f(n-1)} 通りを引いて ${f(n)-2*f(n-1)} 通りです。`);
      }
      if(t==='ends'){
        const n=rand(4,6);
        return R(`${n} 人が 1 列に並ぶとき、A さんと B さんが両端にくる並び方は何通りですか。`, 2*f(n-2), `両端の A, B の入れかわりが 2 通り、残り ${n-2} 人の並びが ${f(n-2)} 通りなので ${2*f(n-2)} 通りです。`);
      }
      if(t==='digits'){
        const n=rand(4,7);
        return R(`1 から ${n} までの数字が 1 つずつ書かれた ${n} 枚のカードから 3 枚を選んで並べ、3 桁の整数をつくります。何個できますか。`, nPr(n,3), `${n}P3 = ${n}×${n-1}×${n-2} = ${nPr(n,3)} 個です。`, '個');
      }
      if(t==='digits0'){
        const n=rand(4,6);
        return R(`0, 1, …, ${n} の ${n+1} 個の数字から異なる 3 つを選んで並べ、3 桁の整数をつくります。何個できますか。`, n*n*(n-1), `百の位は 0 以外の ${n} 通り、十の位は残り ${n} 通り（0 も使える）、一の位は ${n-1} 通り。${n}×${n}×${n-1} = ${n*n*(n-1)} 個です。`, '個');
      }
      if(t==='diag'){
        const n=rand(5,10);
        return R(`正 ${n} 角形の対角線は全部で何本ありますか。`, n*(n-3)/2, `2 頂点を結ぶ ${n}C2 = ${nCk(n,2)} 本から、辺の ${n} 本を引いて ${n*(n-3)/2} 本です。`, '本');
      }
      if(t==='tri'){
        const n=rand(5,9);
        return R(`円周上に ${n} 個の点があります。この中の 3 点を結んでできる三角形は何個ありますか。`, nCk(n,3), `3 点を選べば三角形が 1 つ決まるので ${n}C3 = ${nCk(n,3)} 個です。`, '個');
      }
      const a=rand(2,5), b=rand(2,4);
      return R(`碁盤の目の道を、A 地点から B 地点まで最短経路で進みます。東へ ${a} 区画、北へ ${b} 区画進むとき、経路は何通りですか。`, nCk(a+b,a), `全部で ${a+b} 回の移動のうち、東の ${a} 回の位置を選べばよいので ${a+b}C${a} = ${nCk(a+b,a)} 通りです。`);
    }},

    /* ============ 8. 確率 ============ */
    {id:'h1_kakuritsu', name:'確率(余事象・反復試行)', gen(){
      const t=pick(['dice2','atleast','atleast','balls','hanpuku','hanpuku','multi']);
      const fr=fracHTML;
      if(t==='dice2'){
        if(Math.random()<0.5){
          const s=rand(3,11);
          const cnt=6-Math.abs(s-7);
          return mkCard(`大小2個のさいころを同時に投げるとき、目の和が ${s} になる確率は？`, fr(cnt,36),
            [fr(cnt+1,36), fr(cnt-1,36), fr(cnt,21), fr(cnt,12), fr(1,36), fr(1,12)].filter((x,i)=>true),
            `目の出方は全部で 36 通り。和が ${s} になるのは ${cnt} 通りなので、確率は ${cnt}/36 = ${fr(cnt,36)} です。`);
        }
        const d=rand(1,4);
        const cnt=2*(6-d);
        return mkCard(`大小2個のさいころを同時に投げるとき、目の差（大きい方 − 小さい方）が ${d} になる確率は？`, fr(cnt,36),
          [fr(6-d,36), fr(cnt+1,36), fr(cnt,21), fr(cnt-1,36), fr(cnt,12)],
          `全部で 36 通り。差が ${d} になる組は、大きい方が ${d+1} 以上で小さい方が決まる (大,小) が ${6-d} 組あり、大小を区別するので ${cnt} 通り。確率は ${cnt}/36 = ${fr(cnt,36)} です。`);
      }
      if(t==='atleast'){
        const v=pick(['dice','coin','prod','kuji']);
        if(v==='dice'){
          const n=rand(2,3);
          const tot=Math.pow(6,n), no=Math.pow(5,n);
          return mkCard(`さいころを ${n} 回投げるとき、少なくとも 1 回は 6 の目が出る確率は？`, fr(tot-no,tot),
            [fr(no,tot), fr(n,6), fr(1,tot), fr(tot-no,tot/6*5), fr(n,tot)],
            `余事象「1 回も 6 が出ない」の確率は (5/6)${sup(n)} = ${no}/${tot}。よって 1 − ${no}/${tot} = ${fr(tot-no,tot)} です。`);
        }
        if(v==='coin'){
          const n=rand(3,5), tot=Math.pow(2,n);
          return mkCard(`コインを ${n} 枚投げるとき、少なくとも 1 枚は表が出る確率は？`, fr(tot-1,tot),
            [fr(1,tot), fr(n,tot), fr(1,2), fr(tot-2,tot), fr(n,tot*2)],
            `余事象「すべて裏」の確率は (1/2)${sup(n)} = 1/${tot}。よって 1 − 1/${tot} = ${fr(tot-1,tot)} です。`);
        }
        if(v==='prod'){
          const n=rand(2,3), tot=Math.pow(6,n), odd=Math.pow(3,n);
          return mkCard(`さいころを ${n} 個同時に投げるとき、出た目の積が偶数になる確率は？`, fr(tot-odd,tot),
            [fr(odd,tot), fr(1,2), fr(n,6), fr(tot-odd,tot-1), fr(1,tot)],
            `積が奇数になるのは全部の目が奇数のときで (3/6)${sup(n)} = ${fr(odd,tot)}。余事象より 1 − ${fr(odd,tot)} = ${fr(tot-odd,tot)} です。`);
        }
        const a=rand(2,4), b=rand(3,6), tot=nCk(a+b,2), no=nCk(b,2);
        return mkCard(`当たりくじ ${a} 本、はずれくじ ${b} 本の計 ${a+b} 本から、同時に 2 本引くとき、少なくとも 1 本は当たる確率は？`, fr(tot-no,tot),
          pw(tot-no,tot,[[no,tot],[a*b,tot],[nCk(a,2),tot],[tot-no,tot+1],[a,a+b],[b,a+b],[1,tot],[tot-no-1,tot],[tot-no+1,tot]]),
          `余事象「2 本ともはずれ」の確率は ${b}C2 / ${a+b}C2 = ${no}/${tot}。よって 1 − ${no}/${tot} = ${fr(tot-no,tot)} です。`);
      }
      if(t==='balls'){
        const a=rand(2,5), b=rand(2,5), n=a+b, tot=nCk(n,2);
        const v=pick(['rr','diff','same']);
        if(v==='rr'){
          return mkCard(`赤玉 ${a} 個、白玉 ${b} 個が入った袋から、同時に 2 個取り出すとき、2 個とも赤玉である確率は？`, fr(nCk(a,2),tot),
            pw(nCk(a,2),tot,[[a*a,n*n],[a*(a-1),tot],[nCk(a,2),n*(n-1)],[a,n],[a*b,tot],[nCk(a,2),n*n],[nCk(a,2)+1,tot]]),
            `取り出し方は全部で ${n}C2 = ${tot} 通り。2 個とも赤は ${a}C2 = ${nCk(a,2)} 通り。確率は ${nCk(a,2)}/${tot} = ${fr(nCk(a,2),tot)} です。`);
        }
        if(v==='diff'){
          return mkCard(`赤玉 ${a} 個、白玉 ${b} 個が入った袋から、同時に 2 個取り出すとき、赤玉と白玉が 1 個ずつである確率は？`, fr(a*b,tot),
            pw(a*b,tot,[[a*b,n*n],[2*a*b,tot],[a*b,n*(n-1)],[nCk(a,2)+nCk(b,2),tot],[a+b,tot],[a*b+1,tot],[a*b-1,tot],[b,n]]),
            `取り出し方は全部で ${n}C2 = ${tot} 通り。赤 1 個の選び方 ${a} 通りと白 1 個の選び方 ${b} 通りをかけて ${a*b} 通り。確率は ${a*b}/${tot} = ${fr(a*b,tot)} です。`);
        }
        return mkCard(`赤玉 ${a} 個、白玉 ${b} 個が入った袋から、同時に 2 個取り出すとき、2 個が同じ色である確率は？`, fr(nCk(a,2)+nCk(b,2),tot),
          pw(nCk(a,2)+nCk(b,2),tot,[[nCk(a,2),tot],[a*b,tot],[a*a+b*b,n*n],[a,n],[nCk(a,2)+nCk(b,2),n*(n-1)],[nCk(a,2)+nCk(b,2)+1,tot],[nCk(a,2)+nCk(b,2)-1,tot],[nCk(b,2),tot]]),
          `取り出し方は全部で ${n}C2 = ${tot} 通り。2 個とも赤が ${nCk(a,2)} 通り、2 個とも白が ${nCk(b,2)} 通りで合計 ${nCk(a,2)+nCk(b,2)} 通り。確率は ${fr(nCk(a,2)+nCk(b,2),tot)} です。`);
      }
      if(t==='hanpuku'){
        const setup=pick([[1,2],[1,6],[1,3],[2,3]]);
        const [pa,pb]=setup;
        const n=rand(3,5), k=rand(1,n-1);
        const num=nCk(n,k)*Math.pow(pa,k)*Math.pow(pb-pa,n-k), den=Math.pow(pb,n);
        const story={
          '1,2':`コインを ${n} 回投げるとき、表がちょうど ${k} 回出る確率は？`,
          '1,6':`さいころを ${n} 回投げるとき、1 の目がちょうど ${k} 回出る確率は？`,
          '1,3':`1 回の試行で成功する確率が 1/3 のとき、この試行を ${n} 回くり返して、ちょうど ${k} 回成功する確率は？`,
          '2,3':`シュートが入る確率が 2/3 の選手が ${n} 回シュートを打つとき、ちょうど ${k} 回入る確率は？`
        }[setup.join(',')];
        const wrongs=pw(num,den,[
          [Math.pow(pa,k)*Math.pow(pb-pa,n-k),den],
          [nCk(n,k)*Math.pow(pa,k),den],
          [nCk(n,k)*Math.pow(pa,n-k)*Math.pow(pb-pa,k),den],
          [nCk(n,k),den],
          [num,den*pb],
          [num+1,den],[num*2+1,den],[den-num+1,den],[num,den+1],[num-1,den]
        ]);
        return mkCard(story, fr(num,den), wrongs,
          `反復試行の確率 nCk·p^k·(1−p)^(n−k) を使います。p = ${pa}/${pb} より ${n}C${k}×(${pa}/${pb})${sup(k)}×(${pb-pa}/${pb})${sup(n-k)} = ${num}/${den} = ${fr(num,den)} です。`);
      }
      // multi
      const N=pick([20,30,40,50,60]);
      let a,b; do{ a=rand(2,7); b=rand(2,7); }while(a===b);
      const fa=Math.floor(N/a), fb=Math.floor(N/b), fl=Math.floor(N/lcm(a,b));
      const u=fa+fb-fl;
      return mkCard(`1 から ${N} までの番号が書かれたカードから 1 枚引くとき、${a} の倍数または ${b} の倍数である確率は？`, fr(u,N),
        pw(u,N,[[fa+fb,N],[fa+fb-2*fl,N],[N-u,N],[u+1,N],[u-1,N],[u+2,N],[u-2,N],[fa,N],[fb,N],[u,N+1],[fl,N],[u,N-1]]),
        `${a} の倍数は ${fa} 枚、${b} の倍数は ${fb} 枚、両方の倍数（${lcm(a,b)} の倍数）は ${fl} 枚。${fa} + ${fb} − ${fl} = ${u} 枚なので、確率は ${u}/${N} = ${fr(u,N)} です。`);
    }},

    /* ============ 9. 集合と論理・整数 ============ */
    {id:'h1_shugo', name:'集合と論理・整数の性質', gen(){
      const t=pick(['count','count','nec','nec','contra','divisors','gcd','base','base','amari']);
      if(t==='count'){
        const N=pick([50,60,80,100,120,150,200]);
        let a,b; do{ a=rand(2,9); b=rand(2,9); }while(a===b);
        const fa=Math.floor(N/a), fb=Math.floor(N/b), l=lcm(a,b), fl=Math.floor(N/l);
        const u=fa+fb-fl;
        const v=pick(['union','neither','both']);
        const stem=`n(A) = ${fa}、n(B) = ${fb}、n(A∩B) = ${fl}`;
        if(v==='union'){
          return { kind:'text', text:`1 から ${N} までの整数のうち、${a} の倍数または ${b} の倍数であるものは何個ありますか。`,
            explain:`${a} の倍数を A、${b} の倍数を B とすると ${stem}（A∩B は ${l} の倍数）。n(A∪B) = ${fa} + ${fb} − ${fl} = ${u} 個です。`,
            answers:[{type:'int', value:u, unit:'個'}] };
        }
        if(v==='neither'){
          return { kind:'text', text:`1 から ${N} までの整数のうち、${a} でも ${b} でも割り切れないものは何個ありますか。`,
            explain:`${a} の倍数を A、${b} の倍数を B とすると ${stem}。n(A∪B) = ${u}。割り切れないものは ${N} − ${u} = ${N-u} 個です。`,
            answers:[{type:'int', value:N-u, unit:'個'}] };
        }
        return { kind:'text', text:`1 から ${N} までの整数のうち、${a} の倍数であり、かつ ${b} の倍数でもあるものは何個ありますか。`,
          explain:`両方の倍数は ${a} と ${b} の最小公倍数 ${l} の倍数です。${N} ÷ ${l} の商より ${fl} 個です。`,
          answers:[{type:'int', value:fl, unit:'個'}] };
      }
      if(t==='nec'){
        let it=nsItem();
        let rel=it.rel, p=it.p, q=it.q, fpq=it.fpq, fqp=it.fqp;
        if((rel==='S'||rel==='N') && Math.random()<0.5){
          [p,q]=[q,p];
          [fpq,fqp]=[fqp,fpq];
          rel=rel==='S'?'N':'S';
        }
        const pq=(rel==='S'||rel==='B'), qp=(rel==='N'||rel==='B');
        const ans=NS_ANS[rel];
        const ex=`p ⇒ q は${pq?'真':`偽${fpq?`（反例: ${fpq}）`:''}`}、q ⇒ p は${qp?'真':`偽${fqp?`（反例: ${fqp}）`:''}`}。よって p は q であるための${ans}。`;
        return mkCard(`${it.pre?it.pre+'<br>':''}次の条件 p, q について、p は q であるための何条件か。<br>p: ${p}<br>q: ${q}`, ans,
          Object.values(NS_ANS).filter(x=>x!==ans), ex);
      }
      if(t==='contra'){
        const k=rand(1,9), k2=rand(2,9);
        const tp=pick([
          {P:`x > ${k}`, nP:`x ≦ ${k}`, Q:`x${sup(2)} > ${k*k}`, nQ:`x${sup(2)} ≦ ${k*k}`},
          {P:`n は ${2*k2} の倍数`, nP:`n は ${2*k2} の倍数でない`, Q:`n は ${k2} の倍数`, nQ:`n は ${k2} の倍数でない`},
          {P:`x = ${k}`, nP:`x ≠ ${k}`, Q:`x${sup(2)} = ${k*k}`, nQ:`x${sup(2)} ≠ ${k*k}`},
          {P:'a > 0 かつ b > 0', nP:'a ≦ 0 または b ≦ 0', Q:'ab > 0', nQ:'ab ≦ 0'}
        ]);
        const f=(u,w)=>`${u} ならば ${w}`;
        const forms={ '逆':f(tp.Q,tp.P), '裏':f(tp.nP,tp.nQ), '対偶':f(tp.nQ,tp.nP) };
        const neg=f(tp.P,tp.nQ);
        const ask=pick(['逆','裏','対偶','対偶']);
        const ans=forms[ask];
        const others=[forms['逆'],forms['裏'],forms['対偶'],neg].filter(x=>x!==ans);
        const dsc={ '逆':'「q ならば p」', '裏':'「p でないならば q でない」', '対偶':'「q でないならば p でない」' }[ask];
        return mkCard(`命題「${f(tp.P,tp.Q)}」の${ask}はどれか。`, ans, others,
          `もとの命題を「p ならば q」（p: ${tp.P}、q: ${tp.Q}）とすると、${ask}は${dsc}の形です。`);
      }
      if(t==='divisors'){
        const primes=shuffle([2,3,5,7]).slice(0,rand(1,3));
        let N,exps;
        do{ exps=primes.map(()=>rand(1,4)); N=primes.reduce((acc,pr,i)=>acc*Math.pow(pr,exps[i]),1); }while(N>1500||N<12);
        let cnt=0; for(let i=1;i<=N;i++) if(N%i===0) cnt++;
        const fac=primes.map((pr,i)=>exps[i]===1?`${pr}`:`${pr}${sup(exps[i])}`).join(' × ');
        const prod=exps.map(e=>`(${e}+1)`).join('×');
        return { kind:'text', text:`${N} の正の約数は全部で何個ありますか。`,
          explain:`${N} = ${fac} と素因数分解できます。約数の個数は ${prod} = ${cnt} 個です。`,
          answers:[{type:'int', value:cnt, unit:'個'}] };
      }
      if(t==='gcd'){
        const g=rand(2,12);
        let m,n; do{ m=rand(2,9); n=rand(2,9); }while(m===n||gcd(m,n)!==1);
        const a=g*m, b=g*n;
        const askG=Math.random()<0.5;
        return { kind:'text', text:`${a} と ${b} の${askG?'最大公約数':'最小公倍数'}を求めよ。`,
          explain:`${a} = ${g}×${m}、${b} = ${g}×${n}（${m} と ${n} は互いに素）と表せます。最大公約数は ${g}、最小公倍数は ${g}×${m}×${n} = ${g*m*n} です。`,
          answers:[{type:'int', value:askG?g:g*m*n}] };
      }
      if(t==='base'){
        const v=pick(['toBin','toBase','fromBase']);
        const bs=(s,b)=>`${s}<sub>(${b})</sub>`;
        const rev=s=>s.split('').reverse().join('');
        if(v==='toBin'){
          const N=rand(9,63);
          const good=N.toString(2);
          const wr=uniq([rev(good).replace(/^0+/,''),(N+1).toString(2),(N-1).toString(2),(N+2).toString(2)].filter(x=>x!==good)).map(x=>bs(x,2));
          return mkCard(`10 進数の ${N} を 2 進法で表すと？`, bs(good,2), wr,
            `2 で割っていき、余りを下から読みます。${N} = ${good.split('').map((d,i)=>d==='1'?`2${sup(good.length-1-i)}`:null).filter(x=>x).join(' + ')} なので ${bs(good,2)} です。`);
        }
        if(v==='toBase'){
          const b=pick([3,4,5,8]);
          const N=rand(10,60);
          const good=N.toString(b);
          const wr=uniq([rev(good).replace(/^0+/,''),(N+1).toString(b),(N-1).toString(b),(N+b).toString(b)].filter(x=>x!==good)).map(x=>bs(x,b));
          return mkCard(`10 進数の ${N} を ${b} 進法で表すと？`, bs(good,b), wr,
            `${b} で割っていき、余りを下から読みます。${N} を ${b} 進法で表すと ${bs(good,b)} です。`);
        }
        const b=pick([2,3,5,8]);
        const len=b===2?rand(4,6):rand(3,4);
        let s=String(rand(1,b-1));
        for(let i=1;i<len;i++) s+=String(rand(0,b-1));
        const val=parseInt(s,b);
        const expl=s.split('').map((d,i)=>`${d}×${b}${sup(len-1-i)}`).join(' + ');
        return { kind:'text', text:`${b} 進数 ${s} を 10 進数で表すといくつですか。`,
          explain:`${expl} を計算して ${val} です。`,
          answers:[{type:'int', value:val}] };
      }
      // amari
      let d,r,m,c,ans;
      do{ d=rand(3,9); r=rand(1,d-1); m=rand(2,4); c=rand(1,5); ans=(m*r+c)%d; }while(ans===0);
      return { kind:'text', text:`整数 n を ${d} で割ると ${r} 余ります。このとき、${m}n + ${c} を ${d} で割った余りを求めよ。`,
        explain:`n = ${d}k + ${r}（k は整数）とおくと、${m}n + ${c} = ${d}×${m}k + ${m*r+c}。${m*r+c} を ${d} で割った余りは ${ans} です。`,
        answers:[{type:'int', value:ans}] };
    }},

  ]);
})();
