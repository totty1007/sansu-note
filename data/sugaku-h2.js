/* 数学II・B (s_h2) */
(function(){
  // ---------- ヘルパー ----------
  function fmt(n){ if(n===0) return '0'; return n<0 ? '−'+(-n) : String(n); }
  function sub(x){ return '<sub>'+x+'</sub>'; }
  function toS(v){ return (typeof v==='number') ? fmt(v) : String(v); }
  // 項の配列 [[係数, 変数HTML], ...] を整形。cont=true なら先頭にも " + "/" − " を付ける
  function poly(terms, cont){
    let s='';
    terms.forEach(function(t){
      const c=t[0], v=t[1]||'';
      if(c===0) return;
      const ab=Math.abs(c);
      const cs=(ab===1&&v)?'':String(ab);
      if(!s && !cont) s=(c<0?'−':'')+cs+v;
      else s+=' '+(c<0?'−':'+')+' '+cs+v;
    });
    return s || (cont?'':'0');
  }
  // cs[i] = x^i の係数 → 降べきの式
  function polyx(cs){
    const t=[];
    for(let i=cs.length-1;i>=0;i--){ t.push([cs[i], i===0?'':(i===1?'x':'x'+sup(i))]); }
    return poly(t);
  }
  function evalp(cs,x){ let s=0; for(let i=0;i<cs.length;i++) s+=cs[i]*Math.pow(x,i); return s; }
  function deriv(cs){ const r=[]; for(let i=1;i<cs.length;i++) r.push(cs[i]*i); return r; }
  function rnz(a,b){ let v=0; while(v===0) v=rand(a,b); return v; }
  function fr(n,d){
    if(d<0){ n=-n; d=-d; }
    const g=gcd(Math.abs(n),d)||1; n/=g; d/=g;
    if(d===1) return fmt(n);
    return (n<0?'−':'')+fracHTMLRaw(Math.abs(n),d);
  }
  function frv(n,d){ return n/d; }
  function pt(x,y){ return '('+fmt(x)+', '+fmt(y)+')'; }
  function cx(re,im){
    if(re===0&&im===0) return '0';
    let s='';
    if(re!==0) s=fmt(re);
    if(im!==0){
      const ab=Math.abs(im); const t=(ab===1)?'i':ab+'i';
      if(re!==0) s+=' '+(im<0?'−':'+')+' '+t; else s=(im<0?'−':'')+t;
    }
    return s;
  }
  function rad(n){ // √n を簡約したHTML
    let k=1,m=n;
    for(let f=2;f*f<=m;f++){ while(m%(f*f)===0){ m/=f*f; k*=f; } }
    if(m===1) return String(k);
    return (k===1?'':String(k))+sqrtHTML(m);
  }
  // 整数が答えのカード。extra は典型的な誤答(数または文字列)
  function ic(q,v,explain,extra){
    const w=(extra||[]).filter(function(x){ return typeof x!=='number' || (isFinite(x) && Math.floor(x)===x); }).map(toS);
    [v+1,v-1,v+2,v-2,-v,v*2,v+3,v-3,v+10].forEach(function(x){ w.push(fmt(x)); });
    return mkCard(q, fmt(v), w, explain);
  }
  // 分数が答えのカード。extra は [n,d] の配列
  function fc(q,n,d,explain,extra){
    const w=(extra||[]).map(function(p){ return (typeof p==='string')?p:fr(p[0],p[1]); });
    [[n+1,d],[n-1,d],[n,d+1],[n,d*2],[-n,d],[n+d,d]].forEach(function(p){ if(p[1]!==0) w.push(fr(p[0],p[1])); });
    return mkCard(q, fr(n,d), w, explain);
  }
  function xm(r){ return r===0?'x':(r>0?'x − '+r:'x + '+(-r)); }
  function pn(v){ return v<0?'('+fmt(v)+')':fmt(v); }
  function sb(v,x){ return v===0?x:(v<0?x+' + '+(-v):x+' − '+v); }
  function paren(s){ return '('+s+')'; }
  function logS(b,arg){ return 'log'+sub(b)+' '+arg; }
  // 数列の一般項の右辺（a_n = は付けない）
  function linN(dd,cc){ return poly([[dd,'n'],[cc,'']]); }
  function geoN(c,rr,e){ return (c===1?'':c+'·')+rr+sup(e); }

  // ---------- 1. 指数・対数 ----------
  function genShisuTaisu(){
    const p=rand(1,8);
    if(p===1){
      const b=pick([2,3,5]), m=rand(2,6), n=rand(1,5); const k=rand(1,m+n-1);
      const e=m+n-k;
      if(Math.pow(b,e)>5000) return genShisuTaisu();
      return ic(b+sup(m)+' × '+b+sup(n)+' ÷ '+b+sup(k)+' の値は？', Math.pow(b,e),
        '指数法則より '+b+sup(m+'+'+n+'−'+k)+' = '+b+sup(e)+' = '+Math.pow(b,e)+'。',
        [Math.pow(b,m+n-k+1), Math.pow(b,m*n-k>0?Math.min(m*n-k,6):e+2)]);
    }
    if(p===2){
      const c=pick([[4,3,2],[8,2,3],[27,2,3],[16,3,4],[9,3,2],[25,3,2],[8,4,3],[32,3,5],[64,2,3],[125,2,3]]);
      // base = r^den ; 指数 num/den → r^num
      const r=pick([2,3,5]); const den=pick([2,3]); const num=rand(1,3)===1?den+1:rand(1,4);
      if(num===den) return genShisuTaisu();
      const base=Math.pow(r,den);
      const ans=Math.pow(r,num);
      if(ans>2000) return genShisuTaisu();
      return ic(base+sup(num+'/'+den)+' の値は？', ans,
        base+' = '+r+sup(den)+' だから、'+base+sup(num+'/'+den)+' = '+r+sup(den+'×'+num+'/'+den)+' = '+r+sup(num)+' = '+ans+'。',
        [base*num/den, Math.pow(base,num)/den, r*num]);
    }
    if(p===3){
      const b=pick([2,3,5,10]); const n=rand(1,3);
      const d=Math.pow(b,n);
      return fc(b+sup('−'+n)+' の値は？', 1, d, b+sup('−'+n)+' = 1 ÷ '+b+sup(n)+' = '+fr(1,d)+'。',
        [[-1,d],[-n,b],[1,b*n]]);
    }
    if(p===4){
      const b=pick([2,3,5,10]); const k=rand(2,(b===10?4:(b===5?3:5)));
      const N=Math.pow(b,k);
      return ic(logS(b,N)+' の値は？', k, N+' = '+b+sup(k)+' だから '+logS(b,N)+' = '+k+'。',
        [N/b, N-b, k+1]);
    }
    if(p===5){
      const b=pick([2,3,5,6,10]); const k=rand(1,3);
      const T=Math.pow(b,k);
      const divs=[]; for(let d=2;d<T;d++) if(T%d===0) divs.push(d);
      if(divs.length===0) return genShisuTaisu();
      const A=pick(divs), B=T/A;
      if(rand(0,1)===0){
        return ic(logS(b,A)+' + '+logS(b,B)+' の値は？', k,
          '対数の和は真数の積。'+logS(b,A+'×'+B)+' = '+logS(b,T)+' = '+k+'。', [A+B, A*B, k+1]);
      }else{
        const A2=T*B; // A2/B = T
        return ic(logS(b,A2)+' − '+logS(b,B)+' の値は？', k,
          '対数の差は真数の商。'+logS(b,A2+'÷'+B)+' = '+logS(b,T)+' = '+k+'。', [A2-B, A2/B, k-1]);
      }
    }
    if(p===6){
      const b=pick([2,3,5]); const maxE=(b===5?3:4);
      const P=rand(2,maxE), Q=rand(1,maxE+1);
      if(P===Q) return genShisuTaisu();
      const big=Math.pow(b,P), num=Math.pow(b,Q);
      return fc(logS(big,num)+' の値は？', Q, P,
        '底を '+b+' にそろえると '+logS(big,num)+' = '+fracHTMLRaw('log'+sub(b)+' '+num,'log'+sub(b)+' '+big)+' = '+fracHTMLRaw(Q,P)+'。',
        [[P,Q],[Q-P,P],[Q+P,P],[Q,big]]);
    }
    if(p===7){
      const b=pick([2,3,5]); const b2=pick([2,3,5,7].filter(function(x){return x!==b;}));
      const k=rand(2,4);
      const N=Math.pow(b,k);
      return ic(logS(b,b2)+' × '+logS(b2,N)+' の値は？', k,
        '底の変換公式より '+logS(b,b2)+' × '+logS(b2,N)+' = '+logS(b,N)+' = '+k+'。',
        [N, b2*k, k+b]);
    }
    // p===8: 対数方程式
    const b=pick([2,3,5]);
    const t=rand(1,3);
    if(t===1){
      const k=rand(1,4), c=rand(1,6);
      const x=Math.pow(b,k)-c;
      return ic(logS(b,'(x + '+c+')')+' = '+k+' を解くと、x は？', x,
        'x + '+c+' = '+b+sup(k)+' = '+Math.pow(b,k)+' より x = '+x+'。',
        [Math.pow(b,k)+c, k-c, b*k-c]);
    }
    if(t===2){
      const k=rand(2,4);
      return ic(logS(b,'x')+' = '+k+' を解くと、x は？', Math.pow(b,k),
        'x = '+b+sup(k)+' = '+Math.pow(b,k)+'。', [b*k, k*k, Math.pow(k,b)]);
    }
    const x0=rand(1,6), c=rand(1,5); const M=x0*(x0+c);
    return ic(logS(b,'x')+' + '+logS(b,'(x + '+c+')')+' = '+logS(b,M)+' を解くと、x は？', x0,
      '真数について x(x + '+c+') = '+M+'。x² + '+c+'x − '+M+' = 0 より (x − '+x0+')(x + '+(x0+c)+') = 0。真数条件 x > 0 より x = '+x0+'。',
      [-(x0+c), M, x0+c]);
  }

  // ---------- 2. 三角関数（弧度法・特別な角） ----------
  let HALF,S2,S3,T3,SINB,COSB,TANB,R6,R2,R3;
  function initTables(){
    if(HALF) return;
    HALF=fracHTMLRaw(1,2); S2=fracHTMLRaw(sqrtHTML(2),2); S3=fracHTMLRaw(sqrtHTML(3),2); T3=fracHTMLRaw(sqrtHTML(3),3);
    SINB={30:HALF,45:S2,60:S3}; COSB={30:S3,45:S2,60:HALF}; TANB={30:T3,45:'1',60:sqrtHTML(3)};
    R6=sqrtHTML(6); R2=sqrtHTML(2); R3=sqrtHTML(3);
  }
  function piHTML(d){ // d度 → 弧度法のHTML
    const g=gcd(d,180); const n=d/g, den=180/g;
    const top=(n===1?'':String(n))+'π';
    return den===1 ? top : fracHTMLRaw(top,den);
  }
  function angleText(d){
    return rand(0,1)===0 ? d+'°' : piHTML(d);
  }
  function genKakudo(){
    initTables();
    const p=rand(1,4);
    if(p===1){
      const d=pick([30,45,60,90,120,135,150,180,210,225,240,270,300,315,330,360]);
      return mkCard(d+'° を弧度法で表すと？', piHTML(d),
        [fracHTMLRaw(d+'π',360), fracHTMLRaw(d+'π',90), d+'π', fracHTMLRaw('π',d), d<360?piHTML(360-d):fracHTMLRaw('π',2), d%2===0?piHTML(d/2):piHTML(d*2>360?d/3:d*2)],
        '180° = π ラジアンだから、'+d+'° = '+d+' × π/180 = '+piHTML(d)+'。');
    }
    if(p===2){
      const d=pick([30,45,60,120,135,150,210,225,240,300,315,330]);
      return ic('弧度法で '+piHTML(d)+' ラジアンは何度？', d,
        'π = 180° だから、'+piHTML(d)+' = '+d+'°。',
        [d*2, d/2, 180-d, 360-d, d+30]);
    }
    // sin / cos / tan の値
    const fn=pick(['sin','cos','tan']);
    const d=pick([30,45,60,120,135,150,210,225,240,300,315,330]);
    const q=(d<90)?1:(d<180?2:(d<270?3:4));
    const ref=(q===1)?d:(q===2?180-d:(q===3?d-180:360-d));
    const sgn=(fn==='sin')?((q<=2)?1:-1):((fn==='cos')?((q===1||q===4)?1:-1):((q===1||q===3)?1:-1));
    const tbl=(fn==='sin')?SINB:((fn==='cos')?COSB:TANB);
    const val=function(r,s){ return (s<0?'−':'')+tbl[r]; };
    const refs=[30,45,60];
    const wrong=[val(ref,-sgn)];
    refs.forEach(function(r){ if(r!==ref){ wrong.push(val(r,sgn)); wrong.push(val(r,-sgn)); } });
    const label=fn+' '+angleText(d);
    const why=(d>=90)?('（基準角 '+ref+'° と象限で符号を決める）'):'';
    return mkCard(label+' の値は？', val(ref,sgn), wrong,
      fn+' '+d+'° は基準角 '+ref+'° の値で、第'+q+'象限では '+fn+' の符号は'+(sgn>0?'正':'負')+'。よって '+val(ref,sgn)+'。');
  }

  // ---------- 3. 三角関数（加法定理・2倍角） ----------
  const TRIP=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];
  function genKahou(){
    initTables();
    const p=rand(1,5);
    if(p===1){
      const items=[
        ['sin 75°', fracHTMLRaw(R6+' + '+R2,4), 'sin(45°+30°) = sin45°cos30° + cos45°sin30° = '+'(√6+√2)/4'],
        ['cos 75°', fracHTMLRaw(R6+' − '+R2,4), 'cos(45°+30°) = cos45°cos30° − sin45°sin30° = (√6−√2)/4'],
        ['sin 15°', fracHTMLRaw(R6+' − '+R2,4), 'sin(45°−30°) = sin45°cos30° − cos45°sin30° = (√6−√2)/4'],
        ['cos 15°', fracHTMLRaw(R6+' + '+R2,4), 'cos(45°−30°) = cos45°cos30° + sin45°sin30° = (√6+√2)/4'],
        ['sin 105°', fracHTMLRaw(R6+' + '+R2,4), 'sin(60°+45°) = sin60°cos45° + cos60°sin45° = (√6+√2)/4'],
        ['cos 105°', fracHTMLRaw(R2+' − '+R6,4), 'cos(60°+45°) = cos60°cos45° − sin60°sin45° = (√2−√6)/4']
      ];
      const it=pick(items);
      const pool=[fracHTMLRaw(R6+' + '+R2,4), fracHTMLRaw(R6+' − '+R2,4), fracHTMLRaw(R2+' − '+R6,4),
        fracHTMLRaw(R3+' + 1',2), fracHTMLRaw(R6+' + '+R2,2), fracHTMLRaw(R2+' + '+R3,2)];
      return mkCard(it[0]+' の値は？', it[1], pool, it[2]+'。');
    }
    if(p===2){
      const items=[
        ['tan 75°','2 + '+R3,'tan(45°+30°) = (1 + 1/√3)/(1 − 1/√3) = 2 + √3'],
        ['tan 15°','2 − '+R3,'tan(45°−30°) = (1 − 1/√3)/(1 + 1/√3) = 2 − √3'],
        ['tan 105°','−2 − '+R3,'tan105° = −tan75° = −(2+√3)']
      ];
      const it=pick(items);
      return mkCard(it[0]+' の値は？', it[1], ['2 + '+R3,'2 − '+R3,'−2 − '+R3,'−2 + '+R3,'1 + '+R3,R3+' − 1', fracHTMLRaw(R3+' + 1',2)], it[2]+'。');
    }
    if(p===3){
      const i=rand(0,3); let j=rand(0,3); while(j===i) j=rand(0,3);
      const A=TRIP[i], B=TRIP[j];
      const a1=A[0],b1=A[1],c1=A[2],a2=B[0],b2=B[1],c2=B[2];
      const useSin=rand(0,1)===0;
      const D=c1*c2;
      const n=useSin?(a1*b2+b1*a2):(b1*b2-a1*a2);
      const wr=useSin?[[a1*b2-b1*a2,D],[b1*b2-a1*a2,D],[a1*a2+b1*b2,D],[a1*a2,D]]
                     :[[b1*b2+a1*a2,D],[a1*b2+b1*a2,D],[a1*a2-b1*b2,D],[b1*b2,D]];
      return fc('α, β は鋭角で sin α = '+fr(a1,c1)+'、sin β = '+fr(a2,c2)+' のとき、'+(useSin?'sin(α + β)':'cos(α + β)')+' の値は？', n, D,
        'cos α = '+fr(b1,c1)+'、cos β = '+fr(b2,c2)+'。'+(useSin?'sin(α+β) = sinα cosβ + cosα sinβ':'cos(α+β) = cosα cosβ − sinα sinβ')+' = '+fr(n,D)+'。', wr);
    }
    const tr=pick(TRIP);
    const a=tr[0], b=tr[1], c=tr[2];
    const swap=rand(0,1)===0;
    const s=swap?b:a, co=swap?a:b; // sinθ=s/c, cosθ=co/c （θは鋭角）
    if(p===4){
      return fc('θ は鋭角で sin θ = '+fr(s,c)+' のとき、sin 2θ の値は？', 2*s*co, c*c,
        'cos θ = '+fr(co,c)+'。sin2θ = 2 sinθ cosθ = 2 × '+fr(s,c)+' × '+fr(co,c)+' = '+fr(2*s*co,c*c)+'。',
        [[2*s,c],[s*co,c*c],[co*co-s*s,c*c],[2*s*s,c*c]]);
    }
    return fc('θ は鋭角で sin θ = '+fr(s,c)+' のとき、cos 2θ の値は？', co*co-s*s, c*c,
      'cos2θ = 1 − 2sin²θ = 1 − 2 × '+fr(s*s,c*c)+' = '+fr(co*co-s*s,c*c)+'。',
      [[s*s-co*co,c*c],[1-s*s,c*c],[1-2*s,c],[2*s*co,c*c]]);
  }

  // ---------- 4. 微分 ----------
  function randPoly(deg){
    const cs=[];
    for(let i=0;i<=deg;i++){
      if(i===deg) cs.push(rnz(-4,4)); else cs.push(rnz(-6,6));
    }
    return cs;
  }
  function genBibun(){
    const p=rand(1,5);
    if(p===1){
      const cs=randPoly(rand(2,3)); const d=deriv(cs);
      const wrongs=[];
      wrongs.push(polyx(cs.slice(1)));
      wrongs.push(polyx([d[0]+cs[0]].concat(d.slice(1))));
      wrongs.push(polyx([0].concat(d.slice(1))));
      wrongs.push(poly(cs.map(function(c,i){ return [c*i, i===0?'':(i===1?'x':'x'+sup(i))]; }).reverse()));
      return mkCard('f(x) = '+polyx(cs)+' のとき、導関数 f′(x) は？', polyx(d), wrongs,
        'x'+sup('n')+' の微分は n x'+sup('n−1')+'、定数の微分は 0。よって f′(x) = '+polyx(d)+'。');
    }
    if(p===2){
      const cs=randPoly(rand(2,3)); const a=rand(-3,3);
      const d=deriv(cs); const v=evalp(d,a);
      return ic('f(x) = '+polyx(cs)+' のとき、微分係数 f′('+fmt(a)+') の値は？', v,
        'f′(x) = '+polyx(d)+' に x = '+fmt(a)+' を代入して '+fmt(v)+'。', [evalp(cs,a), evalp(d,-a), evalp(cs.slice(1),a)]);
    }
    if(p===3){
      const cs=randPoly(3); const a=rand(-2,3);
      const d=deriv(cs); const m=evalp(d,a);
      return ic('曲線 y = '+polyx(cs)+' 上の点 x = '+fmt(a)+' における接線の傾きは？', m,
        'y′ = '+polyx(d)+' に x = '+fmt(a)+' を代入して、傾きは '+fmt(m)+'。', [evalp(cs,a), evalp(d,-a)]);
    }
    if(p===4){
      const cs=randPoly(rand(2,3)); const a=rand(-2,3);
      const d=deriv(cs); const m=evalp(d,a); const fa=evalp(cs,a);
      const n=fa-m*a;
      const line=function(mm,nn){ return 'y = '+poly([[mm,'x'],[nn,'']]); };
      return mkCard('曲線 y = '+polyx(cs)+' 上の点 ('+fmt(a)+', '+fmt(fa)+') における接線の方程式は？', line(m,n),
        [line(m,fa), line(m,fa+m*a), line(m,-n), line(fa,n), line(evalp(d,-a), fa-evalp(d,-a)*a), line(m+1,n), line(m,n+1), line(m,n-1), line(m-1,n)],
        '傾きは f′('+fmt(a)+') = '+fmt(m)+'。'+sb(fa,'y')+' = '+fmt(m)+'('+sb(a,'x')+') を整理して '+line(m,n)+'。');
    }
    // 極値
    let P=rand(-3,3), Q=rand(-3,4); if(P===Q) Q=P+rand(1,3);
    const lo=Math.min(P,Q), hi=Math.max(P,Q);
    const k=rand(1,2), c0=rnz(-5,5);
    const cs=[c0, 6*k*P*Q, -3*k*(P+Q), 2*k];
    const askMax=rand(0,1)===0;
    const ans=askMax?lo:hi;
    return ic('f(x) = '+polyx(cs)+' が'+(askMax?'極大':'極小')+'となる x の値は？', ans,
      'f′(x) = '+(6*k)+'('+sb(lo,'x')+')('+sb(hi,'x')+')（'+'x = '+fmt(lo)+', '+fmt(hi)+' で 0）。x³ の係数が正なので、f′ の符号は + → − → + と変わり、小さい方の '+fmt(lo)+' で極大、大きい方の '+fmt(hi)+' で極小。',
      [askMax?hi:lo, P+Q, (P+Q)/2 === Math.floor((P+Q)/2) ? (P+Q)/2 : lo*hi]);
  }

  // ---------- 5. 積分 ----------
  function genSekibun(){
    const p=rand(1,4);
    if(p===1){
      const a=rnz(-3,3), b=rnz(-4,4), c=rnz(-5,5);
      const f=[c, 2*b, 3*a];
      const F=function(cs){ return polyx(cs); };
      const good=poly([[a,'x'+sup(3)],[b,'x'+sup(2)],[c,'x'],[1,'C']]).replace(/C$/,'C');
      const mk=function(terms){ return poly(terms.concat([[1,'C']])); };
      return mkCard('不定積分 ∫ ('+polyx(f)+') dx を求めよ。（C は積分定数）', mk([[a,'x'+sup(3)],[b,'x'+sup(2)],[c,'x']]),
        [poly([[a,'x'+sup(3)],[b,'x'+sup(2)],[c,'x']]),
         mk([[3*a,'x'+sup(3)],[2*b,'x'+sup(2)],[c,'x']]),
         mk([[6*a,'x'],[2*b,'']]),
         mk([[a,'x'+sup(3)],[b,'x'+sup(2)],[c,'x'+sup(2)]])],
        'x'+sup('n')+' の積分は x'+sup('n+1')+'/(n+1)。各項を積分して '+mk([[a,'x'+sup(3)],[b,'x'+sup(2)],[c,'x']])+'。');
    }
    if(p===2){
      const deg=rand(1,3);
      const cs=randPoly(deg).map(function(v,i){ return v; });
      let lo=rand(-2,1), hi=lo+rand(1,3);
      const L=12; let N=0;
      for(let i=0;i<cs.length;i++) N+=cs[i]*(L/(i+1))*(Math.pow(hi,i+1)-Math.pow(lo,i+1));
      let Nq=0; for(let i=0;i<cs.length;i++) Nq+=cs[i]*(L/(i+1))*Math.pow(hi,i+1);
      // 定数項を忘れた誤り
      let Nc=0; for(let i=1;i<cs.length;i++) Nc+=cs[i]*(L/(i+1))*(Math.pow(hi,i+1)-Math.pow(lo,i+1));
      return intDefCard(cs,lo,hi,N,L,Nq,Nc);
    }
    if(p===3){
      let P=rand(-3,1), Q=P+rand(2,5);
      const a=pick([1,2,3,-1,-2]);
      const cs=[a*P*Q, -a*(P+Q), a];
      const n=Math.abs(a)*Math.pow(Q-P,3);
      return fc('放物線 y = '+polyx(cs)+' と x 軸で囲まれた部分の面積は？', n, 6,
        polyx(cs)+' = '+(a===1?'':(a===-1?'−':fmt(a)))+'('+sb(P,'x')+')('+sb(Q,'x')+') より x 軸との交点は x = '+fmt(P)+', '+fmt(Q)+'。面積は |a|(Q−P)³/6 = '+Math.abs(a)+' × '+Math.pow(Q-P,3)+'/6 = '+fr(n,6)+'。',
        [[n,3],[Math.abs(a)*Math.pow(Q-P,2),6],[-n,6],[n,2],[Math.abs(a)*(Q-P),6]]);
    }
    // 変数上端を含む簡単な定積分：∫0^n の x^k
    const k=rand(1,3), n=rand(1,4), c=rand(1,4);
    const valN=c*Math.pow(n,k+1); const valD=k+1;
    return fc('定積分 ∫'+sub(0)+sup(n)+' '+(c===1?'':c)+'x'+(k===1?'':sup(k))+' dx の値は？', valN, valD,
      '原始関数は '+(fr(c,k+1)==='1'?'':fr(c,k+1)+' ')+'x'+sup(k+1)+'。x = '+n+' を代入し、下端 0 では 0。値は '+fr(valN,valD)+'。',
      [[c*Math.pow(n,k),1],[valN,valD+1],[c*Math.pow(n,k+1)*(k+1),1]]);
  }
  function intDefCard(cs,lo,hi,N,L,Nq,Nc){
    return mkCard('定積分 ∫'+sub(fmt(lo))+sup(fmt(hi))+' ('+polyx(cs)+') dx の値は？', fr(N,L),
      [fr(-N,L), fr(Nq,L), fr(Nc,L), fr(N+L,L), fr(N,L*2), fr(N-L,L), fr(N+2*L,L), fr(N+L,L*2), fr(N-2*L,L)],
      '原始関数 F(x) を作り F('+fmt(hi)+') − F('+fmt(lo)+') を計算すると '+fr(N,L)+'。');
  }

  // ---------- 6. 等差数列・等比数列 ----------
  function genSuretsu(){
    const p=rand(1,8);
    if(p===1){
      const a1=rnz(-9,12), d=rnz(-5,6), n=rand(8,30);
      return ic('初項 '+fmt(a1)+'、公差 '+fmt(d)+' の等差数列の第 '+n+' 項は？', a1+(n-1)*d,
        'a'+sub('n')+' = a'+sub(1)+' + (n−1)d より '+fmt(a1)+' + '+(n-1)+' × '+pn(d)+' = '+fmt(a1+(n-1)*d)+'。',
        [a1+n*d, a1+(n-2)*d, a1*n*d]);
    }
    if(p===2){
      const a1=rnz(-8,10), d=rnz(-5,6);
      const gen=function(dd,cc){ return 'a'+sub('n')+' = '+poly([[dd,'n'],[cc,'']]); };
      return mkCard('初項 '+fmt(a1)+'、公差 '+fmt(d)+' の等差数列の一般項 a'+sub('n')+' は？', gen(d,a1-d),
        [gen(d,a1), gen(d,a1+d), gen(a1,d-a1), gen(-d,a1+d), gen(d,d-a1)],
        'a'+sub('n')+' = '+fmt(a1)+' + (n−1)×('+fmt(d)+') = '+linN(d,a1-d)+'。');
    }
    if(p===3){
      const a1=rnz(-6,10), d=rnz(-5,6); const s=rand(2,5), t=s+rand(2,4);
      return ic('等差数列で、第 '+s+' 項が '+fmt(a1+(s-1)*d)+'、第 '+t+' 項が '+fmt(a1+(t-1)*d)+' のとき、公差は？', d,
        '第'+t+'項 − 第'+s+'項 = ('+t+'−'+s+')d より '+fmt((t-s)*d)+' = '+(t-s)+'d。よって d = '+fmt(d)+'。',
        [(t-s)*d, -d, d*(t-s)/1+1]);
    }
    if(p===4){
      const a1=rnz(1,4), r=pick([2,3,-2,-3]), n=rand(4,7);
      const v=a1*Math.pow(r,n-1);
      return ic('初項 '+a1+'、公比 '+fmt(r)+' の等比数列の第 '+n+' 項は？', v,
        'a'+sub('n')+' = a'+sub(1)+'r'+sup('n−1')+' より '+a1+' × ('+fmt(r)+')'+sup(n-1)+' = '+fmt(v)+'。',
        [a1*Math.pow(r,n), a1*Math.pow(r,n-2), a1*r*(n-1), Math.pow(a1*r,n-1)]);
    }
    if(p===5){
      const a1=rnz(1,4), r=pick([2,3,4]);
      const gen=function(c,rr,e){ return 'a'+sub('n')+' = '+geoN(c,rr,e); };
      return mkCard('初項 '+a1+'、公比 '+r+' の等比数列の一般項 a'+sub('n')+' は？', gen(a1,r,'n−1'),
        [gen(a1,r,'n'), gen(a1,r,'n+1'), gen(r,a1,'n−1'), gen(a1,r,'n−2'), 'a'+sub('n')+' = '+a1+'·'+r+'·n'],
        'a'+sub('n')+' = a'+sub(1)+'r'+sup('n−1')+' = '+geoN(a1,r,'n−1')+'。');
    }
    if(p===6){
      const a1=rnz(1,3), r=pick([2,3]); const s=rand(2,3), t=s+2;
      const as=a1*Math.pow(r,s-1), at=a1*Math.pow(r,t-1);
      return ic('公比が正の等比数列で、第 '+s+' 項が '+as+'、第 '+t+' 項が '+at+' のとき、公比は？', r,
        '第'+t+'項 ÷ 第'+s+'項 = r'+sup(2)+' = '+(at/as)+'。公比は正なので r = '+r+'。',
        [at/as, r*r, -r, at-as]);
    }
    if(p===7){
      const a1=rnz(-5,8), d=rnz(1,5)*pick([1,-1]), n=rand(8,20);
      const S=n*(2*a1+(n-1)*d)/2;
      return ic('初項 '+fmt(a1)+'、公差 '+fmt(d)+' の等差数列の初項から第 '+n+' 項までの和は？', S,
        'S'+sub('n')+' = n(2a+(n−1)d)/2 = '+n+' × ('+fmt(2*a1)+' + '+(n-1)+' × '+pn(d)+')/2 = '+fmt(S)+'。',
        [n*(2*a1+(n-1)*d), n*(a1+(n-1)*d)/2, n*(2*a1+n*d)/2, (n-1)*(2*a1+(n-2)*d)/2]);
    }
    const a1=rnz(1,3), r=pick([2,3,-2]), n=rand(4,7);
    const S=a1*(Math.pow(r,n)-1)/(r-1);
    return ic('初項 '+a1+'、公比 '+fmt(r)+' の等比数列の初項から第 '+n+' 項までの和は？', S,
      'S'+sub('n')+' = a(r'+sup('n')+'−1)/(r−1) = '+a1+'×(('+fmt(r)+')'+sup(n)+'−1)/('+fmt(r)+'−1) = '+fmt(S)+'。',
      [a1*(Math.pow(r,n)-1), a1*(Math.pow(r,n-1)-1)/(r-1), a1*(1-Math.pow(r,n))/(r-1), a1*(Math.pow(r,n)+1)/(r-1)]);
  }

  // ---------- 7. Σと数列の和 ----------
  function genSigma(){
    const p=rand(1,5);
    const sig=function(lo,n,body){ return '∑'+'<sub>k='+lo+'</sub><sup>'+n+'</sup> '+body; };
    if(p===1){
      const n=rand(5,20);
      const a=rnz(-3,4), b=rnz(-5,6);
      const v=a*n*(n+1)/2+b*n;
      return ic(sig(1,n,'('+poly([[a,'k'],[b,'']])+')')+' の値は？', v,
        '∑k = n(n+1)/2 = '+(n*(n+1)/2)+'、∑1 = n = '+n+'。よって '+fmt(a)+' × '+(n*(n+1)/2)+' + '+fmt(b)+' × '+n+' = '+fmt(v)+'。',
        [a*n*(n+1)/2, a*n*(n+1)/2-b*n, a*n*(n+1)+b*n, a*n*(n+1)/2+b]);
    }
    if(p===2){
      const n=rand(3,12);
      const s2=n*(n+1)*(2*n+1)/6;
      const a=rand(1,3), b=rnz(-3,4);
      let v=0; for(let k=1;k<=n;k++) v+=a*k*k+b*k;
      return ic(sig(1,n,'('+poly([[a,'k'+sup(2)],[b,'k']])+')')+' の値は？', v,
        '∑k² = n(n+1)(2n+1)/6 = '+s2+'、∑k = '+(n*(n+1)/2)+'。'+a+' × '+s2+' + '+fmt(b)+' × '+(n*(n+1)/2)+' = '+fmt(v)+'。',
        [a*s2, a*s2-b*n*(n+1)/2, a*n*(n+1)/2+b*s2, a*Math.pow(n*(n+1)/2,2)+b*n*(n+1)/2]);
    }
    if(p===3){
      const lo=rand(2,6), n=lo+rand(3,8);
      const a=rand(1,3), b=rnz(-3,4);
      let v=0; for(let k=lo;k<=n;k++) v+=a*k+b;
      let vall=0; for(let k=1;k<=n;k++) vall+=a*k+b;
      return ic(sig(lo,n,'('+poly([[a,'k'],[b,'']])+')')+' の値は？', v,
        'k = 1 から '+n+' までの和から、k = 1 から '+(lo-1)+' までの和を引く。'+fmt(vall)+' − '+pn(vall-v)+' = '+fmt(v)+'。',
        [vall, vall-(a*lo+b), vall-(vall-v)-(a*lo+b), v+a*lo+b]);
    }
    if(p===4){
      const items=[
        [sig(1,'n','k'), fracHTMLRaw('n(n+1)',2), [fracHTMLRaw('n(n−1)',2),fracHTMLRaw('n(n+1)(2n+1)',6),'n(n+1)',fracHTMLRaw('n(n+1)',4)], '∑k = 1 + 2 + … + n = n(n+1)/2。'],
        [sig(1,'n','k'+sup(2)), fracHTMLRaw('n(n+1)(2n+1)',6), [fracHTMLRaw('n(n+1)(2n+1)',3),fracHTMLRaw('n(n+1)(2n−1)',6),fracHTMLRaw('n(n+1)',2),'n'+sup(2)+'(n+1)'+sup(2)+'/4'], '公式 ∑k² = n(n+1)(2n+1)/6。'],
        [sig(1,'n','(2k − 1)'), 'n'+sup(2), ['n(n+1)','2n'+sup(2),'n'+sup(2)+' − 1','n'+sup(2)+' + 1'], '初項 1、公差 2 の等差数列の和で、1 + 3 + … + (2n−1) = n²。'],
        [sig(1,'n','3'), '3n', ['3','n'+sup(3),'3n'+sup(2),'n+3'], '定数 3 を n 個足すので 3n。']
      ];
      const it=pick(items);
      return mkCard(it[0]+' を n の式で表すと？', it[1], it[2], it[3]);
    }
    const n=rand(4,10); const a=rand(1,3), b=rnz(-2,3);
    let v=0; for(let k=1;k<=n;k++) v+=k*(a*k+b);
    return ic(sig(1,n,'k('+poly([[a,'k'],[b,'']])+')')+' の値は？', v,
      'k('+poly([[a,'k'],[b,'']])+') = '+poly([[a,'k'+sup(2)],[b,'k']])+' と展開し、∑k² = '+(n*(n+1)*(2*n+1)/6)+'、∑k = '+(n*(n+1)/2)+' を使うと '+fmt(v)+'。',
      [a*Math.pow(n*(n+1)/2,2), a*(n*(n+1)*(2*n+1)/6), v+n, v-n]);
  }

  // ---------- 8. 漸化式 ----------
  function genZenkashiki(){
    const p=rand(1,6);
    const A=function(i){ return 'a'+sub(i); };
    if(p===1){
      const a1=rnz(-5,8), d=rnz(-4,5), N=rand(8,20);
      return ic(A('1')+' = '+fmt(a1)+'、'+A('n+1')+' = '+A('n')+' + '+(d<0?'('+fmt(d)+')':d)+' のとき、'+A(N)+' は？', a1+(N-1)*d,
        '公差 '+fmt(d)+' の等差数列。'+A(N)+' = '+fmt(a1)+' + '+(N-1)+' × '+pn(d)+' = '+fmt(a1+(N-1)*d)+'。',
        [a1+N*d, a1+(N-2)*d, a1*N*d]);
    }
    if(p===2){
      const a1=rnz(1,3), r=pick([2,3,-2]), N=rand(4,7);
      return ic(A('1')+' = '+a1+'、'+A('n+1')+' = '+(r<0?'('+fmt(r)+')':r)+A('n')+' のとき、'+A(N)+' は？', a1*Math.pow(r,N-1),
        '公比 '+fmt(r)+' の等比数列。'+A(N)+' = '+a1+' × ('+fmt(r)+')'+sup(N-1)+' = '+fmt(a1*Math.pow(r,N-1))+'。',
        [a1*Math.pow(r,N), a1*Math.pow(r,N-2), a1*r*(N-1)]);
    }
    if(p===3){
      const a1=rnz(-2,5), u=rand(1,3), w=rnz(-2,3), N=rand(5,7);
      let a=a1; for(let n=1;n<N;n++) a+=u*n+w;
      const terms=[a1]; let t=a1; for(let n=1;n<N;n++){ t+=u*n+w; terms.push(t); }
      return ic(A('1')+' = '+fmt(a1)+'、'+A('n+1')+' = '+A('n')+' + '+poly([[u,'n'],[w,'']])+' のとき、'+A(N)+' は？', a,
        '順に計算すると '+A('2')+' = '+fmt(terms[1])+'、…、'+A(N)+' = '+fmt(a)+'。（階差が '+poly([[u,'n'],[w,'']])+' の階差数列）',
        [terms[N-2], a+u*N+w, a1+(N-1)*(u+w)]);
    }
    if(p===4){
      let a1=rnz(-2,3); const c=rnz(-3,3), N=rand(4,6); if(a1===-c) a1=a1+1;
      const terms=[a1]; let t=a1; for(let n=1;n<N;n++){ t=2*t+c; terms.push(t); }
      return ic(A('1')+' = '+fmt(a1)+'、'+A('n+1')+' = 2'+A('n')+' '+(c<0?'−':'+')+' '+Math.abs(c)+' のとき、'+A(N)+' は？', t,
        '順に計算して '+terms.map(function(v,i){ return A(i+1)+' = '+fmt(v); }).join('、')+'。',
        [terms[N-2], 2*t, t+c, terms[N-1]+(N)]);
    }
    if(p===5){
      const a1=rnz(-5,8), d=rnz(-4,5);
      const gen=function(dd,cc){ return 'a'+sub('n')+' = '+poly([[dd,'n'],[cc,'']]); };
      return mkCard(A('1')+' = '+fmt(a1)+'、'+A('n+1')+' = '+A('n')+' '+(d<0?'−':'+')+' '+Math.abs(d)+' で定まる数列の一般項は？', gen(d,a1-d),
        [gen(d,a1), gen(d,a1+d), gen(a1,d-a1), gen(-d,a1+d)],
        '公差 '+fmt(d)+' の等差数列なので a'+sub('n')+' = '+fmt(a1)+' + (n−1)×('+fmt(d)+') = '+linN(d,a1-d)+'。');
    }
    const a1=rnz(1,3), r=pick([2,3,4]);
    const gen=function(c,rr,e){ return 'a'+sub('n')+' = '+geoN(c,rr,e); };
    return mkCard(A('1')+' = '+a1+'、'+A('n+1')+' = '+r+A('n')+' で定まる数列の一般項は？', gen(a1,r,'n−1'),
      [gen(a1,r,'n'), gen(r,a1,'n−1'), gen(a1,r,'n+1'), gen(a1,r,'n−2'), 'a'+sub('n')+' = '+a1+'·'+r+'·n'],
      '公比 '+r+' の等比数列なので a'+sub('n')+' = '+geoN(a1,r,'n−1')+'。');
  }

  // ---------- 9. 図形と方程式 ----------
  function genZukei(){
    const p=rand(1,7);
    if(p===1){
      const x1=rand(-5,5), y1=rand(-5,5);
      const dx=rnz(-6,6), dy=rnz(-6,6);
      const x2=x1+dx, y2=y1+dy; const d2=dx*dx+dy*dy;
      return mkCard('2点 A'+pt(x1,y1)+'、B'+pt(x2,y2)+' の間の距離 AB は？', rad(d2),
        [String(d2), fmt(Math.abs(dx)+Math.abs(dy)), rad(Math.abs(dx*dx-dy*dy)||d2+1), rad(d2+4), rad(d2+1)],
        'AB² = ('+fmt(dx)+')² + ('+fmt(dy)+')² = '+d2+' だから AB = '+rad(d2)+'。');
    }
    if(p===2){
      const P=rnz(-5,5), Q=rnz(-5,5), r=rand(1,6);
      const c=P*P+Q*Q-r*r;
      const eq='x'+sup(2)+' + y'+sup(2)+poly([[-2*P,'x'],[-2*Q,'y'],[c,'']],true)+' = 0';
      return mkCard('円 '+eq+' の中心の座標は？', pt(P,Q), [pt(-P,-Q),pt(-P,Q),pt(P,-Q),pt(2*P,2*Q),pt(-2*P,-2*Q)],
        '平方完成すると ('+sb(P,'x')+')² + ('+sb(Q,'y')+')² = '+(r*r)+'。中心は '+pt(P,Q)+'、半径は '+r+'。');
    }
    if(p===3){
      const P=rnz(-5,5), Q=rnz(-5,5), r=rand(2,6);
      const c=P*P+Q*Q-r*r;
      const eq='x'+sup(2)+' + y'+sup(2)+poly([[-2*P,'x'],[-2*Q,'y'],[c,'']],true)+' = 0';
      return ic('円 '+eq+' の半径は？', r,
        '('+sb(P,'x')+')² + ('+sb(Q,'y')+')² = '+(P*P+Q*Q-c)+' と変形でき、半径は √'+(r*r)+' = '+r+'。',
        [r*r, Math.abs(c), P*P+Q*Q, 2*r]);
    }
    if(p===4){
      const P=rnz(-4,4), Q=rnz(-4,4), r=rand(1,5);
      const c=P*P+Q*Q-r*r;
      const mkEq=function(a,b,cc){ return 'x'+sup(2)+' + y'+sup(2)+poly([[a,'x'],[b,'y'],[cc,'']],true)+' = 0'; };
      return mkCard('中心 '+pt(P,Q)+'、半径 '+r+' の円の方程式を x² + y² + ax + by + c = 0 の形で表すと？', mkEq(-2*P,-2*Q,c),
        [mkEq(2*P,2*Q,c), mkEq(-2*P,-2*Q,P*P+Q*Q+r*r), mkEq(-P,-Q,c), mkEq(-2*P,-2*Q,P*P+Q*Q-r), mkEq(-2*P,2*Q,c)],
        '('+sb(P,'x')+')² + ('+sb(Q,'y')+')² = '+(r*r)+' を展開して '+mkEq(-2*P,-2*Q,c)+'。');
    }
    if(p===5){
      const nv=pick([[3,4,5],[4,3,5],[3,-4,5],[-4,3,5],[5,12,13],[12,5,13],[6,8,10],[8,6,10]]);
      const a=nv[0], b=nv[1], nm=nv[2];
      const x0=rand(-4,5), y0=rand(-4,5), c=rand(-9,9);
      const val=a*x0+b*y0+c;
      if(val===0) return genZukei();
      const line=poly([[a,'x'],[b,'y'],[c,'']])+' = 0';
      return fc('点 '+pt(x0,y0)+' と直線 '+line+' の距離は？', Math.abs(val), nm,
        '距離 = |'+fmt(a)+'×('+fmt(x0)+') + ('+fmt(b)+')×('+fmt(y0)+') + ('+fmt(c)+')| / √('+(a*a)+'+'+(b*b)+') = '+Math.abs(val)+'/'+nm+' = '+fr(Math.abs(val),nm)+'。',
        [[Math.abs(val),1],[Math.abs(val),nm*nm],[Math.abs(a*x0+b*y0),nm],[Math.abs(val)+nm,nm]]);
    }
    if(p===6){
      const m=rnz(-3,3), n=rnz(-5,5);
      const x1=rand(-3,1), x2=x1+rand(1,3);
      const y1=m*x1+n, y2=m*x2+n;
      const line=function(mm,nn){ return 'y = '+poly([[mm,'x'],[nn,'']]); };
      return mkCard('2点 '+pt(x1,y1)+'、'+pt(x2,y2)+' を通る直線の方程式は？', line(m,n),
        [line(-m,n), line(m,-n), line(-m,-n), line(n,m), line(m,n+m)],
        '傾き = ('+fmt(y2)+' − '+pn(y1)+')/('+fmt(x2)+' − '+pn(x1)+') = '+fmt(m)+'。'+pt(x1,y1)+' を通るので '+line(m,n)+'。');
    }
    const x1=rand(-5,5), y1=rand(-5,5);
    const x2=x1+2*rnz(-4,4), y2=y1+2*rnz(-4,4);
    const cxm=(x1+x2)/2, cym=(y1+y2)/2;
    return mkCard('2点 A'+pt(x1,y1)+'、B'+pt(x2,y2)+' を直径の両端とする円の中心の座標は？', pt(cxm,cym),
      [pt(x1+x2,y1+y2), pt(cxm,-cym), pt((x2-x1)/2,(y2-y1)/2), pt(-cxm,cym), pt(cxm+1,cym), pt(cxm,cym+1), pt(cxm-1,cym-1)],
      '中心は線分 AB の中点で、((x座標の和)/2, (y座標の和)/2) = '+pt(cxm,cym)+'。');
  }

  // ---------- 10. 複素数と方程式 ----------
  function genFukuso(){
    const p=rand(1,8);
    if(p===1){
      const a=rnz(-4,4), b=rnz(-4,4), c=rnz(-4,4), d=rnz(-4,4);
      const re=a*c-b*d, im=a*d+b*c;
      return mkCard('('+cx(a,b)+')('+cx(c,d)+') を a + bi の形で表すと？', cx(re,im),
        [cx(a*c+b*d,im), cx(re,a*d-b*c), cx(a*c+b*d,a*d-b*c), cx(a*c,b*d), cx(-re,im)],
        'i² = −1 を使って展開する。実部 ac − bd = '+pn(a)+'×'+pn(c)+' − '+pn(b)+'×'+pn(d)+' = '+fmt(re)+'、虚部 ad + bc = '+fmt(im)+' より '+cx(re,im)+'。');
    }
    if(p===2){
      const c=rnz(-3,3), d=rnz(-3,3), pp=rnz(-4,4), q=rnz(-4,4);
      const nr=pp*c-q*d, ni=pp*d+q*c;
      return mkCard(fracHTMLRaw(cx(nr,ni),cx(c,d))+' を a + bi の形で表すと？', cx(pp,q),
        [cx(pp,-q), cx(q,pp), cx(-pp,q), cx(nr,ni), cx(pp,q+1)],
        '分母の共役 '+cx(c,-d)+' を分子・分母に掛けると分母は '+(c*c+d*d)+'、分子は '+cx(nr*c+ni*d,ni*c-nr*d)+'。約分して '+cx(pp,q)+'。');
    }
    if(p===3){
      const n=rand(10,99); const r=n%4;
      const vals=['1','i','−1','−i'];
      return mkCard('i'+sup(n)+' の値は？（i は虚数単位）', vals[r], vals.filter(function(_,i){ return i!==r; }),
        'i の累乗は 1, i, −1, −i の繰り返しで周期4。'+n+' を 4 で割った余りは '+r+' なので i'+sup(n)+' = '+vals[r]+'。');
    }
    if(p===4){
      const b=rnz(-8,8), c=rnz(-8,8);
      const eq='x'+sup(2)+poly([[b,'x'],[c,'']],true)+' = 0';
      const kind=rand(1,3);
      if(kind===1) return ic('2次方程式 '+eq+' の2つの解を α, β とするとき、α² + β² の値は？', b*b-2*c,
        'α+β = '+fmt(-b)+'、αβ = '+fmt(c)+'。α²+β² = (α+β)² − 2αβ = '+(b*b)+' − 2×('+fmt(c)+') = '+fmt(b*b-2*c)+'。',
        [b*b+2*c, -b-2*c, b*b-c, c*c-2*b]);
      if(kind===2) return ic('2次方程式 '+eq+' の2つの解を α, β とするとき、(α + 1)(β + 1) の値は？', c-b+1,
        'α+β = '+fmt(-b)+'、αβ = '+fmt(c)+'。(α+1)(β+1) = αβ + (α+β) + 1 = '+fmt(c)+' + ('+fmt(-b)+') + 1 = '+fmt(c-b+1)+'。',
        [c+b+1, c-b-1, c-b, -b+c*1+2]);
      const s=-b;
      return ic('2次方程式 '+eq+' の2つの解を α, β とするとき、α³ + β³ の値は？', s*s*s-3*c*s,
        'α+β = '+fmt(s)+'、αβ = '+fmt(c)+'。α³+β³ = (α+β)³ − 3αβ(α+β) = '+fmt(s*s*s)+' − 3×('+fmt(c)+')×('+fmt(s)+') = '+fmt(s*s*s-3*c*s)+'。',
        [s*s*s+3*c*s, s*s*s-3*c, s*s*s, -(s*s*s-3*c*s)]);
    }
    if(p===5){
      const s=rnz(-6,6), t=rnz(-8,8);
      const mk=function(a,b){ return 'x'+sup(2)+poly([[a,'x'],[b,'']],true)+' = 0'; };
      return mkCard('α + β = '+fmt(s)+'、αβ = '+fmt(t)+' となる α, β を解にもつ2次方程式（x² の係数 1）は？', mk(-s,t),
        [mk(s,t), mk(-s,-t), mk(s,-t), mk(t,s), mk(-t,s)],
        'x² − (α+β)x + αβ = 0 だから '+mk(-s,t)+'。');
    }
    if(p===6){
      const a=rnz(-4,4), b=rand(1,4);
      const mk=function(aa,bb,cc){ return 'x'+sup(2)+poly([[aa,'x'],[cc,'']],true)+' = 0'; };
      const ans='x = '+fmt(a)+' ± '+(b===1?'':b)+'i';
      return mkCard('2次方程式 '+mk(-2*a,0,a*a+b*b)+' の解は？', ans,
        ['x = '+fmt(-a)+' ± '+(b===1?'':b)+'i', 'x = '+fmt(a)+' ± '+(b*b===1?'':b*b)+'i', 'x = '+fmt(a)+' ± '+b,'x = '+fmt(2*a)+' ± '+(b===1?'':b)+'i', 'x = '+fmt(-2*a)+' ± '+(b===1?'':b)+'i'],
        '解の公式より x = ('+fmt(2*a)+' ± √('+(4*a*a)+' − '+(4*(a*a+b*b))+')) / 2 = ('+fmt(2*a)+' ± √('+fmt(-4*b*b)+')) / 2 = '+fmt(a)+' ± '+(b===1?'':b)+'i。');
    }
    if(p===7){
      const a=rnz(-3,3), sgn=pick([1,-1]);
      const cs=[rnz(-6,6), rnz(-5,5), rnz(-4,4), rand(1,2)];
      const r=a*sgn>0?'x − '+a*sgn:'x + '+(-a*sgn);
      const av=a*sgn;
      const v=evalp(cs,av);
      return ic('P(x) = '+polyx(cs)+' を '+xm(av)+' で割ったときの余りは？', v,
        '剰余の定理より、余りは P('+fmt(av)+') = '+fmt(v)+'。',
        [evalp(cs,-av), evalp(cs,0), evalp(cs,av)+av]);
    }
    // 因数定理
    const a=pick([-3,-2,-1,1,2,3]);
    const k=rnz(-4,4), c=rnz(-5,5);
    const d=-(a*a*a+k*a*a+c*a);
    return ic('P(x) = x'+sup(3)+' + kx'+sup(2)+poly([[c,'x'],[d,'']],true)+' が '+xm(a)+' で割り切れるとき、定数 k の値は？', k,
      '因数定理より P('+fmt(a)+') = 0。'+poly([[a*a*a,''],[a*a,'k'],[c*a,''],[d,'']])+' = 0 を解くと k = '+fmt(k)+'。',
      [-k, k+1, k-1, d, c]);
  }

  // ---------- 11. 二項定理・恒等式 ----------
  function genNikou(){
    const p=rand(1,6);
    if(p===1){
      const n=rand(4,7), k=rand(1,n-1), a=rnz(-3,3);
      const v=nCk(n,k)*Math.pow(a,n-k);
      return ic('(x '+(a<0?'−':'+')+' '+Math.abs(a)+')'+sup(n)+' の展開式における x'+(k===1?'':sup(k))+' の係数は？', v,
        '一般項は '+n+'C'+sub('r')+' x'+sup('r')+' ('+fmt(a)+')'+sup('n−r')+'。r = '+k+' として '+nCk(n,k)+' × ('+fmt(a)+')'+sup(n-k)+' = '+fmt(v)+'。',
        [nCk(n,k), Math.pow(a,n-k), nCk(n,k)*Math.pow(a,k), nCk(n,k-1)*Math.pow(a,n-k+1)]);
    }
    if(p===2){
      const n=rand(3,6), k=rand(1,n-1), a=rnz(-3,3), b=rnz(-3,3);
      if(a===1&&b===1) return genNikou();
      const v=nCk(n,k)*Math.pow(a,k)*Math.pow(b,n-k);
      const ax=(a===1?'':(a===-1?'−':fmt(a)))+'x';
      return ic('('+ax+' '+(b<0?'−':'+')+' '+Math.abs(b)+')'+sup(n)+' の展開式における x'+(k===1?'':sup(k))+' の係数は？', v,
        '一般項 '+n+'C'+sub('r')+' ('+ax+')'+sup('r')+'('+fmt(b)+')'+sup('n−r')+' で r = '+k+' として '+nCk(n,k)+' × ('+fmt(a)+')'+sup(k)+' × ('+fmt(b)+')'+sup(n-k)+' = '+fmt(v)+'。',
        [nCk(n,k)*Math.pow(a,n-k)*Math.pow(b,k), nCk(n,k)*Math.pow(b,n-k), nCk(n,k)*a*b, Math.pow(a,k)*Math.pow(b,n-k)]);
    }
    if(p===3){
      const n=rand(3,9);
      return ic(n+'C'+sub(0)+' + '+n+'C'+sub(1)+' + '+n+'C'+sub(2)+' + … + '+n+'C'+sub(n)+' の値は？', Math.pow(2,n),
        '(1+x)'+sup(n)+' の展開式で x = 1 とすると各項の係数の和 = 2'+sup(n)+' = '+Math.pow(2,n)+'。',
        [Math.pow(2,n)-1, n*n, Math.pow(2,n+1), 2*n]);
    }
    if(p===4){
      const n=rand(3,6), a=rnz(-3,4), b=rnz(-3,4);
      const ax=(a===1?'':(a===-1?'−':fmt(a)))+'x';
      const v=Math.pow(a+b,n);
      return ic('('+ax+' '+(b<0?'−':'+')+' '+Math.abs(b)+')'+sup(n)+' を展開したときの、すべての項の係数の総和は？（定数項を含む）', v,
        'x = 1 を代入すると係数の総和になり、('+fmt(a)+' + ('+fmt(b)+'))'+sup(n)+' = '+fmt(v)+'。',
        [Math.pow(Math.abs(a)+Math.abs(b),n), Math.pow(a,n)+Math.pow(b,n), Math.pow(a+b,n-1), -v]);
    }
    if(p===5){
      const m=rand(1,3), pp=rnz(-5,5), q=rnz(-5,5), t=rnz(-3,3);
      const b=2*m*t+pp, c=m*t*t+pp*t+q;
      const ask=rand(0,1)===0;
      const lhs=poly([[m,'x'+sup(2)],[pp,'x'],[q,'']]);
      const rhs='a'+paren(xm(t)).replace('(','(')+sup(2)+' + b'+paren(xm(t))+' + c';
      return ic(lhs+' ≡ '+rhs+' が x についての恒等式となるとき、'+(ask?'b':'c')+' の値は？', ask?b:c,
        (ask?'右辺を展開すると x² の係数は a なので a = '+m+'。x の係数を比べて '+fmt(pp)+' = b − 2×'+m+'×'+pn(t)+'。':'x = '+fmt(t)+' を両辺に代入すると右辺は c だけになる。左辺は '+m+'×'+pn(t)+'² + '+pn(pp)+'×'+pn(t)+' + '+pn(q)+' = '+fmt(c)+' なので c = '+fmt(c)+'。')+' 答えは '+fmt(ask?b:c)+'。',
        ask?[pp, c, -b, 2*m*t, b+m]:[q, b, -c, m*t*t, c+t]);
    }
    let r1=rnz(-3,3), r2=rnz(-3,3); while(r2===r1) r2=rnz(-3,3);
    const A=rnz(-4,4), B=rnz(-4,4);
    // A/(x-r1)+B/(x-r2) = ((A+B)x - A r2 - B r1)/((x-r1)(x-r2))
    const nx=A+B, nc=-A*r2-B*r1;
    const num=poly([[nx,'x'],[nc,'']]);
    const den='('+xm(r1)+')('+xm(r2)+')';
    const ask=rand(0,1)===0;
    return ic(fracHTMLRaw(num,den)+' = '+fracHTMLRaw('A',xm(r1))+' + '+fracHTMLRaw('B',xm(r2))+' が x についての恒等式となるとき、'+(ask?'A':'B')+' の値は？', ask?A:B,
      '両辺に '+den+' を掛けて '+num+' = A('+xm(r2)+') + B('+xm(r1)+')。x = '+fmt(ask?r1:r2)+' を代入して '+(ask?'A':'B')+' = '+fmt(ask?A:B)+'。',
      ask?[B, A+B, -A, nc]:[A, A+B, -B, nc]);
  }

  registerMath('s_h2', [
    {id:'h2_shisu_taisu', name:'指数・対数', gen:genShisuTaisu},
    {id:'h2_kakudo_tokubetsu', name:'三角関数（弧度法・特別な角）', gen:genKakudo},
    {id:'h2_kahou_2bai', name:'三角関数（加法定理・2倍角）', gen:genKahou},
    {id:'h2_bibun', name:'微分', gen:genBibun},
    {id:'h2_sekibun', name:'積分', gen:genSekibun},
    {id:'h2_suretsu', name:'等差数列・等比数列', gen:genSuretsu},
    {id:'h2_sigma', name:'Σ（数列の和）', gen:genSigma},
    {id:'h2_zenkashiki', name:'漸化式', gen:genZenkashiki},
    {id:'h2_zukei', name:'図形と方程式', gen:genZukei},
    {id:'h2_fukuso', name:'複素数と方程式', gen:genFukuso},
    {id:'h2_nikou', name:'二項定理・恒等式', gen:genNikou}
  ]);
})();
