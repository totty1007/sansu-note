(function(){
  var MI='−'; // −
  function sn(n){ return n<0 ? MI+(-n) : String(n); }          // 符号付き整数表記
  function pn(n){ return n<0 ? '('+MI+(-n)+')' : String(n); }   // 負ならかっこ
  function ps(n){ return n<0 ? '('+MI+(-n)+')' : '(+'+n+')'; }  // (+3) (−3)
  function absn(n){ return Math.abs(n); }
  function nz(a,b){ var v; do{ v=rand(a,b); }while(v===0); return v; }
  // 有理数 n/d を符号付きHTMLに
  function fr(n,d){
    if(d<0){ n=-n; d=-d; }
    var s=simplifyFrac(Math.abs(n),d);
    var body = s[1]===1 ? String(s[0]) : fracHTMLRaw(s[0],s[1]);
    if(n===0) return '0';
    return n<0 ? MI+body : body;
  }
  function frp(n,d){ var t=fr(n,d); return n<0 ? '('+t+')' : t; }
  // 1次式 a x + b
  function lin(a,b,v){
    v=v||'x'; var s='';
    if(a!==0){
      var c = Math.abs(a)===1 ? '' : String(Math.abs(a));
      s = (a<0?MI:'')+c+v;
    }
    if(b!==0){
      if(a===0) s=sn(b);
      else s += (b<0?' '+MI+' ':' + ')+Math.abs(b);
    }
    return s===''?'0':s;
  }
  function dedupe(arr){ return arr; }
  function fill(correct, wrongs, base){
    // 誤答が足りない時のための予備(数値文字列)
    var out=wrongs.slice();
    return out;
  }

  // ---------- 1. 正負の数 ----------
  function genSeifu(){
    var t=rand(0,5);
    if(t===0){
      var a=nz(-15,15), b=nz(-15,15);
      var op=pick(['+','−']);
      var ans = op==='+' ? a+b : a-b;
      var ex = op==='+' ? '同符号なら絶対値の和に共通の符号、異符号なら絶対値の差に絶対値の大きい方の符号をつける。' : '引き算は、ひく数の符号を変えてたし算にする。';
      return {kind:'text', text:ps(a)+' '+op+' '+ps(b)+' = ', explain:ex+' 答えは '+sn(ans)+'。', answers:[{type:'int', value:ans}]};
    }
    if(t===1){
      var a1=nz(-9,9), b1=nz(-9,9), c1=nz(-9,9);
      var ans1=a1-b1+c1;
      return {kind:'text', text:sn(a1)+' − '+pn(b1)+' + '+pn(c1)+' = ', explain:sn(a1)+' − '+pn(b1)+' + '+pn(c1)+' を、ひく数の符号を変えてたし算に直して計算すると '+sn(ans1)+'。', answers:[{type:'int', value:ans1}]};
    }
    if(t===2){
      var a2=nz(-9,9), b2=nz(-9,9);
      var ans2=a2*b2;
      return {kind:'text', text:pn(a2)+' × '+pn(b2)+' = ', explain:'同符号の積は正、異符号の積は負。絶対値の積は '+absn(a2)+' × '+absn(b2)+' = '+absn(ans2)+' だから '+sn(ans2)+'。', answers:[{type:'int', value:ans2}]};
    }
    if(t===3){
      var b3=nz(-9,9), q3=nz(-12,12), a3=b3*q3;
      return {kind:'text', text:pn(a3)+' ÷ '+pn(b3)+' = ', explain:'同符号の商は正、異符号の商は負。絶対値の商は '+absn(a3)+' ÷ '+absn(b3)+' = '+absn(q3)+' だから '+sn(q3)+'。', answers:[{type:'int', value:q3}]};
    }
    if(t===4){
      var a4=nz(-6,6), b4=nz(-6,6), c4=nz(-6,6);
      var m=a4*b4, ans4=m*c4;
      // 3つの積: 負の数の個数で符号が決まる
      return {kind:'text', text:pn(a4)+' × '+pn(b4)+' × '+pn(c4)+' = ', explain:'負の数が '+[a4,b4,c4].filter(function(x){return x<0;}).length+' 個なので、積は'+(ans4<0?'負':'正')+'。絶対値の積は '+absn(ans4)+' だから '+sn(ans4)+'。', answers:[{type:'int', value:ans4}]};
    }
    // 小数
    var a5=nz(-30,30)/10, b5=nz(-30,30)/10;
    var op5=pick(['+','−']);
    var ans5 = op5==='+' ? a5+b5 : a5-b5;
    ans5=Math.round(ans5*10)/10;
    var fs=function(x){ return x<0 ? '('+MI+Math.abs(x).toFixed(1)+')' : x.toFixed(1); };
    var fs0=function(x){ return x<0 ? MI+Math.abs(x).toFixed(1) : x.toFixed(1); };
    return {kind:'text', text:fs0(a5)+' '+op5+' '+fs(b5)+' = ', explain:'小数点の位置をそろえて、整数のときと同じように符号に注意して計算する。答えは '+fs0(ans5)+'。', answers:[{type:'decimal', value:ans5, tol:0.05}]};
  }
  function genSeifuFrac(){
    // 分数の加減乗除(mkCard)
    var d=pick([2,3,4,5,6,8]);
    var d2=pick([2,3,4,6]);
    var a=nz(-7,7), b=nz(-7,7), t=rand(0,3);
    if(t===0){
      // a/d + b/d2
      var L=lcm(d,d2), n1=a*(L/d), n2=b*(L/d2);
      var ans=n1+n2;
      var ok=fr(ans,L);
      var wr=[fr(a+b,d+d2), fr(n1-n2,L), fr(a+b,L), fr(ans+1,L), fr(ans-1,L), fr(ans+2,L)];
      return mkCard(fr(a,d)+' + '+frp(b,d2)+' = ', ok, wr, '通分して分子どうしを計算する。分母を '+L+' にそろえると '+fr(n1,L)+' + '+frp(n2,L)+' = '+ok+'。');
    }
    if(t===1){
      var L1=lcm(d,d2), m1=a*(L1/d), m2=b*(L1/d2), ansb=m1-m2;
      var okb=fr(ansb,L1);
      var wrb=[fr(m1+m2,L1), fr(a-b,d-d2===0?d+1:d-d2), fr(a-b,L1), fr(ansb+1,L1), fr(ansb-1,L1), fr(ansb+2,L1)];
      return mkCard(fr(a,d)+' − '+frp(b,d2)+' = ', okb, wrb, '通分して、ひく数の符号を変えてたし算にする。分母を '+L1+' にそろえると '+fr(m1,L1)+' + '+frp(-m2,L1)+' = '+okb+'。');
    }
    if(t===2){
      var c=nz(-5,5), e=pick([2,3,4,5,7]);
      var nn=a*c, dd=d*e;
      var okc=fr(nn,dd);
      var wrc=[fr(-nn,dd), fr(a+c,d+e), fr(a*e,d*c<0?-d*c:d*c), fr(nn+1,dd), fr(nn-1,dd), fr(nn,dd+1)];
      return mkCard(fr(a,d)+' × '+frp(c,e)+' = ', okc, wrc, '分数のかけ算は、分子どうし・分母どうしをかける(符号は負の数の個数で決まる)。答えは '+okc+'。');
    }
    // 除法: (a/d) ÷ (c/e) = a*e / (d*c)
    var c2=nz(-5,5), e2=pick([2,3,4,5,7]);
    var nn2=a*e2, dd2=d*c2;
    var sg = (nn2<0) !== (dd2<0) ? -1 : 1;
    var okd=fr(sg*Math.abs(nn2), Math.abs(dd2));
    var wrd=[fr(-sg*Math.abs(nn2), Math.abs(dd2)), fr(sg*Math.abs(a*c2), d*e2), fr(sg*Math.abs(nn2)+1, Math.abs(dd2)), fr(sg*Math.abs(nn2), Math.abs(dd2)+1), fr(sg*Math.abs(nn2)-1, Math.abs(dd2)), fr(sg*Math.abs(nn2)+2, Math.abs(dd2))];
    return mkCard(fr(a,d)+' ÷ '+frp(c2,e2)+' = ', okd, wrd, '分数でわるときは、わる数の逆数をかける。'+fr(a,d)+' × '+frp(e2,c2)+' = '+okd+'。');
  }

  // ---------- 2. 累乗と四則の混合 ----------
  function genPow(){
    var t=rand(0,7);
    if(t===0){
      var a=rand(2,9);
      var ans=-a*a;
      return {kind:'text', text:MI+a+'² = ', explain:MI+a+'² は「'+a+'² に − をつけたもの」なので −('+a+'×'+a+') = '+sn(ans)+'。', answers:[{type:'int',value:ans}]};
    }
    if(t===1){
      var a1=rand(2,9), n1=pick([2,3,3]);
      var ans1=Math.pow(-a1,n1);
      return {kind:'text', text:'('+MI+a1+')'+(n1===2?'²':'³')+' = ', explain:'−'+a1+' を'+n1+'回かける。負の数を'+n1+'回かけるので'+(ans1<0?'負':'正')+'で、'+sn(ans1)+'。', answers:[{type:'int',value:ans1}]};
    }
    if(t===2){
      var a2=rand(2,9), b2=rand(2,5), c2=rand(2,5);
      var ans2=a2-b2*c2*c2;
      return {kind:'text', text:a2+' − '+b2+' × '+c2+'² = ', explain:'累乗を先に計算し、次に乗法、最後に減法。'+c2+'² = '+(c2*c2)+'、'+b2+'×'+(c2*c2)+' = '+(b2*c2*c2)+'、'+a2+' − '+(b2*c2*c2)+' = '+sn(ans2)+'。', answers:[{type:'int',value:ans2}]};
    }
    if(t===3){
      var a3=nz(-9,9), b3=nz(-9,9);
      var ans3=(a3+b3)*(a3+b3);
      return {kind:'text', text:'('+sn(a3)+' + '+pn(b3)+')² = ', explain:'かっこの中を先に計算する。'+sn(a3)+' + '+pn(b3)+' = '+sn(a3+b3)+'。これを2乗して '+ans3+'。', answers:[{type:'int',value:ans3}]};
    }
    if(t===4){
      var b4=rand(2,6), q4=rand(2,9), a4=b4*q4*b4; // (-b)^2 ÷ ...
      var c4=nz(-6,6), d4=rand(2,6);
      var ans4=(b4*b4)/b4 + c4*d4; // b^2÷b + c×d
      return {kind:'text', text:'('+MI+b4+')² ÷ '+b4+' + ('+sn(c4)+') × '+d4+' = ', explain:'(−'+b4+')² = '+(b4*b4)+'。'+(b4*b4)+' ÷ '+b4+' = '+b4+'、('+sn(c4)+')×'+d4+' = '+sn(c4*d4)+'。'+b4+' + '+pn(c4*d4)+' = '+sn(ans4)+'。', answers:[{type:'int',value:ans4}]};
    }
    if(t===5){
      // 分配法則
      var k=rand(2,9), x=rand(11,29), y=rand(1,9);
      var ans5=k*x-k*y;
      return {kind:'text', text:k+' × '+x+' − '+k+' × '+y+' = ', explain:'共通の '+k+' でくくると '+k+' × ('+x+' − '+y+') = '+k+' × '+(x-y)+' = '+ans5+'。', answers:[{type:'int',value:ans5}]};
    }
    if(t===6){
      var k6=pick([2,3,4,6,12]), m6=pick([2,3,4]); while(k6===m6) m6=pick([2,3,4]);
      var d6=lcm(k6,m6)*rand(1,3);
      // d6 × (1/k − 1/m) 相当を整数で: d6/k - d6/m
      var ans6=d6/k6 - d6/m6;
      var lhs=d6+' × ('+fracHTMLRaw(1,k6)+' − '+fracHTMLRaw(1,m6)+') = ';
      var wr=[sn(d6/k6+d6/m6), sn(ans6+1), sn(ans6-1), sn(-ans6), sn(ans6+2), sn(ans6-2)];
      return mkCard(lhs, sn(ans6), wr, '分配法則で '+d6+' を各項にかける。'+d6+' × '+fracHTMLRaw(1,k6)+' = '+(d6/k6)+'、'+d6+' × '+fracHTMLRaw(1,m6)+' = '+(d6/m6)+'。'+(d6/k6)+' − '+(d6/m6)+' = '+sn(ans6)+'。');
    }
    // 7: 大きな括弧つき
    var a7=nz(-5,5), b7=rand(2,6), c7=rand(2,4), d7=nz(-6,6);
    var ans7=(a7-b7)*c7 - d7*d7;
    return {kind:'text', text:'('+sn(a7)+' − '+b7+') × '+c7+' − ('+sn(d7)+')² = ', explain:'かっこの中は '+sn(a7)+' − '+b7+' = '+sn(a7-b7)+'、これに '+c7+' をかけて '+sn((a7-b7)*c7)+'。('+sn(d7)+')² = '+(d7*d7)+'。'+sn((a7-b7)*c7)+' − '+(d7*d7)+' = '+sn(ans7)+'。', answers:[{type:'int',value:ans7}]};
  }

  // ---------- 3. 文字式 ----------
  function genMoji(){
    var t=rand(0,7);
    if(t===0){
      var a=nz(-5,5), b=nz(-9,9), x=nz(-5,5);
      var ans=a*x+b;
      return {kind:'text', text:lin(a,b)+' に x = '+sn(x)+' を代入すると？', explain:'x に '+pn(x)+' を代入する。'+pn(a)+' × '+pn(x)+' + '+pn(b)+' = '+sn(ans)+'。', answers:[{type:'int',value:ans}]};
    }
    if(t===1){
      var a1=rand(1,4), x1=nz(-4,4), b1=nz(-5,5);
      var ans1=a1*x1*x1+b1;
      return {kind:'text', text:lin(0,0).replace('0','')+(a1===1?'':a1)+'x² '+(b1<0?MI+' ':'+ ')+Math.abs(b1)+' に x = '+sn(x1)+' を代入すると？', explain:'x² = ('+sn(x1)+')² = '+(x1*x1)+'。'+a1+' × '+(x1*x1)+' '+(b1<0?'−':'+')+' '+Math.abs(b1)+' = '+sn(ans1)+'。', answers:[{type:'int',value:ans1}]};
    }
    if(t===2){
      var c=nz(-9,9), d=nz(-9,9);
      var cc=pick([2,3,4,5,6,7]);
      var ans2=c;
      // 項の係数
      var a2=nz(-9,9), b2=nz(-9,9);
      return {kind:'text', text:'式 '+lin(a2,b2)+' で、x の項の係数は？', explain:'x の項は '+lin(a2,0)+' で、係数は x にかかっている数字の部分(符号を含む) '+sn(a2)+'。', answers:[{type:'int',value:a2}]};
    }
    if(t===3){
      // 同類項をまとめる
      var a3=nz(-9,9), b3=nz(-9,9), c3=nz(-9,9), d3=nz(-9,9);
      var A=a3+c3, B=b3+d3;
      var q=lin(a3,b3)+' + '+(c3<0?'('+lin(c3,0)+')':lin(c3,0)).replace(/^/,'')+(d3<0?' '+MI+' '+Math.abs(d3):' + '+d3);
      // 単純に並べた式: ax + b + cx + d
      var q3=lin(a3,0)+' '+(b3<0?MI+' ':'+ ')+Math.abs(b3)+' '+(c3<0?MI+' ':'+ ')+(Math.abs(c3)===1?'':Math.abs(c3))+'x '+(d3<0?MI+' ':'+ ')+Math.abs(d3);
      var ok=lin(A,B);
      var wr=[lin(A,B+2*0+1), lin(a3-c3,b3+d3), lin(A+1,B), lin(A,-B), lin(A,B-1), lin(a3+c3,a3+b3+c3+d3)];
      return mkCard(q3+' を簡単にすると？', ok, wr, 'x の項どうし、数の項どうしを別々にまとめる(同類項)。x の項は '+sn(a3)+' '+(c3<0?MI:'+')+' '+Math.abs(c3)+' = '+sn(A)+'、数の項は '+sn(b3)+' '+(d3<0?MI:'+')+' '+Math.abs(d3)+' = '+sn(B)+'。答えは '+ok+'。');
    }
    if(t===4){
      // (ax+b)+(cx+d)
      var a4=nz(-6,6), b4=nz(-8,8), c4=nz(-6,6), d4=nz(-8,8);
      var ok4=lin(a4+c4,b4+d4);
      var wr4=[lin(a4+c4,b4+d4+1), lin(a4+c4,b4-d4), lin(a4-c4,b4+d4), lin(a4+c4,-(b4+d4)), lin(a4+c4+1,b4+d4), lin(a4+c4,b4+d4-1)];
      return mkCard('('+lin(a4,b4)+') + ('+lin(c4,d4)+') を計算すると？', ok4, wr4, 'かっこをはずして、x の項どうし、数の項どうしをまとめる。x の項: '+sn(a4)+' '+(c4<0?MI:'+')+' '+Math.abs(c4)+' = '+sn(a4+c4)+'、数の項: '+sn(b4)+' '+(d4<0?MI:'+')+' '+Math.abs(d4)+' = '+sn(b4+d4)+'。');
    }
    if(t===5){
      // (ax+b)-(cx+d)
      var a5=nz(-6,6), b5=nz(-8,8), c5=nz(-6,6), d5=nz(-8,8);
      var ok5=lin(a5-c5,b5-d5);
      var wr5=[lin(a5-c5,b5+d5), lin(a5+c5,b5-d5), lin(a5+c5,b5+d5), lin(a5-c5,d5-b5), lin(a5-c5+1,b5-d5), lin(a5-c5,b5-d5+1)];
      return mkCard('('+lin(a5,b5)+') − ('+lin(c5,d5)+') を計算すると？', ok5, wr5, '−( ) のかっこをはずすと中の各項の符号が変わる。'+'x の項は '+sn(a5)+' '+MI+' '+pn(c5)+' = '+sn(a5-c5)+'、数の項は '+sn(b5)+' '+MI+' '+pn(d5)+' = '+sn(b5-d5)+'。');
    }
    if(t===6){
      // k(ax+b)
      var k=nz(-6,6), a6=nz(-5,5), b6=nz(-7,7);
      if(Math.abs(k)===1) k=k*2;
      var ok6=lin(k*a6,k*b6);
      var wr6=[lin(k*a6,b6), lin(k*a6,-k*b6), lin(a6,k*b6), lin(k+a6,k+b6), lin(k*a6,k*b6+1), lin(k*a6+1,k*b6)];
      var kk = k<0 ? '('+MI+Math.abs(k)+')' : String(k);
      return mkCard(kk+'('+lin(a6,b6)+') を計算すると？', ok6, wr6, '分配法則で、かっこの中のすべての項に '+sn(k)+' をかける。'+sn(k)+' × '+pn(a6)+' = '+sn(k*a6)+'、'+sn(k)+' × '+pn(b6)+' = '+sn(k*b6)+'。');
    }
    // (ax+b) ÷ m
    var m=pick([2,3,4,5]), a7=nz(-5,5), b7=nz(-5,5);
    var A7=a7*m, B7=b7*m;
    var ok7=lin(a7,b7);
    var wr7=[lin(a7,B7), lin(A7,b7), lin(a7,-b7), lin(a7+1,b7), lin(a7,b7+1), lin(-a7,b7)];
    return mkCard('('+lin(A7,B7)+') ÷ '+m+' を計算すると？', ok7, wr7, 'わる数 '+m+' で各項を割る(または '+fracHTMLRaw(1,m)+' をかける)。'+sn(A7)+' ÷ '+m+' = '+sn(a7)+'、'+sn(B7)+' ÷ '+m+' = '+sn(b7)+'。');
  }

  // ---------- 4. 一次方程式 ----------
  function genEq(){
    var t=rand(0,5);
    var x=nz(-9,9);
    if(t===0){
      // ax + b = c
      var a=nz(-6,6); if(Math.abs(a)===1) a=a*3;
      var b=nz(-12,12), c=a*x+b;
      return {kind:'text', text:lin(a,b)+' = '+sn(c)+' のとき x = ', explain:'定数項 '+sn(b)+' を移項して '+lin(a,0)+' = '+sn(c-b)+'。両辺を '+sn(a)+' でわって x = '+sn(x)+'。', answers:[{type:'int',value:x}]};
    }
    if(t===1){
      // ax + b = cx + d
      var a1=nz(-7,7), c1=nz(-7,7);
      while(a1===c1) c1=nz(-7,7);
      var b1=nz(-12,12), d1=a1*x+b1-c1*x;
      var lhs=lin(a1,b1), rhs=lin(c1,d1);
      return {kind:'text', text:lhs+' = '+rhs+' のとき x = ', explain:'x の項を左辺、数の項を右辺に移項する。'+lin(a1-c1,0)+' = '+sn(d1-b1)+' より x = '+sn(x)+'。', answers:[{type:'int',value:x}]};
    }
    if(t===2){
      // k(x + b) = c
      var k=rand(2,6), b2=nz(-8,8), c2=k*(x+b2);
      return {kind:'text', text:k+'(x '+(b2<0?MI+' ':'+ ')+Math.abs(b2)+') = '+sn(c2)+' のとき x = ', explain:'かっこをはずすと '+k+'x '+(k*b2<0?MI:'+')+' '+Math.abs(k*b2)+' = '+sn(c2)+'。移項して '+k+'x = '+sn(c2-k*b2)+'、x = '+sn(x)+'。', answers:[{type:'int',value:x}]};
    }
    if(t===3){
      // ax - k(x + b) = d  →  a x + ... ; k(x-b)+a = ... simpler: p(x+q)=r(x+s)??
      var p=rand(2,5), q=nz(-6,6), r=rand(1,4), s=nz(-6,6);
      while(p===r) r=rand(1,4);
      // p(x+q) = r(x+s) は解 x=(rs-pq)/(p-r) が整数とは限らない → 解から s を調整
      // s = (p x + p q - r x)/r が整数になるよう x を選び直す
      var xs=[], i;
      for(i=-9;i<=9;i++){ if(i!==0 && (p*i+p*q-r*i)%r===0) xs.push(i); }
      var xx=pick(xs), ss=(p*xx+p*q-r*xx)/r;
      var lhs3=p+'(x '+(q<0?MI+' ':'+ ')+Math.abs(q)+')';
      var rhs3=(r===1?'':r)+'(x '+(ss<0?MI+' ':'+ ')+Math.abs(ss)+')';
      if(ss===0) rhs3=(r===1?'':r)+'x';
      if(q===0) return genEq();
      return {kind:'text', text:lhs3+' = '+rhs3+' のとき x = ', explain:'両辺のかっこをはずして x の項と数の項を移項する。'+lin(p,p*q)+' = '+lin(r,r*ss)+' より '+lin(p-r,0)+' = '+sn(r*ss-p*q)+(p-r===1?'':'、x = '+sn(xx))+'。', answers:[{type:'int',value:xx}]};
    }
    if(t===4){
      // x/k + m = n (分数係数) mkCard
      var k4=pick([2,3,4,5,6]), y=nz(-6,6), x4=k4*y, m=nz(-9,9), n=y+m;
      var ok=sn(x4);
      var wr=[sn(k4*(n+m)), sn(k4*n-m), sn(y), sn(-x4), sn(x4+k4), sn(x4-k4)];
      return mkCard(fracHTMLRaw('x',k4)+' '+(m<0?MI:'+')+' '+Math.abs(m)+' = '+sn(n)+' のとき x = ', ok, wr, '定数項 '+sn(m)+' を移項すると '+fracHTMLRaw('x',k4)+' = '+sn(n-m)+'。両辺に '+k4+' をかけて x = '+ok+'。');
    }
    // 係数が分数: (a/b) x = c  or  x/k - x/l = c
    var k5=pick([2,3,4]), l5=pick([3,4,5,6]);
    while(k5===l5) l5=pick([3,4,5,6]);
    var L=lcm(k5,l5), z=nz(-4,4), x5=L*z;
    var c5=x5/k5 - x5/l5;
    var ok5=sn(x5);
    var wr5=[sn(-x5), sn(x5+L), sn(x5-L), sn(c5), sn(x5*2), sn(z)];
    return mkCard(fracHTMLRaw('x',k5)+' − '+fracHTMLRaw('x',l5)+' = '+sn(c5)+' のとき x = ', ok5, wr5, '両辺に '+k5+' と '+l5+' の最小公倍数 '+L+' をかけて分母を消す。'+(L/k5)+'x − '+(L/l5)+'x = '+sn(c5*L)+'、'+lin(L/k5-L/l5,0)+' = '+sn(c5*L)+' より x = '+ok5+'。');
  }

  // ---------- 5. 比例・反比例 ----------
  function genHirei(){
    var t=rand(0,6);
    if(t===0){
      var a=nz(-8,8), x=nz(-6,6);
      if(Math.abs(a)===1) a*=2;
      return {kind:'text', text:'y は x に比例し、x = '+sn(x)+' のとき y = '+sn(a*x)+' である。比例定数は？', explain:'y = ax に x = '+sn(x)+'、y = '+sn(a*x)+' を代入すると '+sn(a*x)+' = a × '+pn(x)+'。a = '+sn(a*x)+' ÷ '+pn(x)+' = '+sn(a)+'。', answers:[{type:'int',value:a}]};
    }
    if(t===1){
      var a1=nz(-8,8), x1=nz(-6,6), x2=nz(-6,6);
      while(x2===x1) x2=nz(-6,6);
      if(Math.abs(a1)===1) a1*=3;
      return {kind:'text', text:'y は x に比例し、x = '+sn(x1)+' のとき y = '+sn(a1*x1)+' である。x = '+sn(x2)+' のときの y の値は？', explain:'比例定数は '+sn(a1*x1)+' ÷ '+pn(x1)+' = '+sn(a1)+' なので y = '+lin(a1,0)+'。x = '+sn(x2)+' を代入して y = '+sn(a1*x2)+'。', answers:[{type:'int',value:a1*x2}]};
    }
    if(t===2){
      var a2=nz(-9,9), x3=nz(-5,5);
      return {kind:'text', text:'y = '+lin(a2,0)+' で、x = '+sn(x3)+' のときの y の値は？', explain:'x に '+pn(x3)+' を代入して y = '+pn(a2)+' × '+pn(x3)+' = '+sn(a2*x3)+'。', answers:[{type:'int',value:a2*x3}]};
    }
    if(t===3){
      // 反比例の比例定数
      var x4=nz(-6,6), y4=nz(-6,6);
      var a4=x4*y4;
      return {kind:'text', text:'y は x に反比例し、x = '+sn(x4)+' のとき y = '+sn(y4)+' である。比例定数は？', explain:'y = a/x に代入すると a = xy = '+pn(x4)+' × '+pn(y4)+' = '+sn(a4)+'。', answers:[{type:'int',value:a4}]};
    }
    if(t===4){
      // 反比例 x=p のとき y=q, x=r のとき y=?
      var facs=[2,3,4,6,8,9,12,18,24];
      var a5=pick(facs)*pick([1,2,3])*pick([1,-1]);
      var divs=[]; var i; for(i=1;i<=Math.abs(a5);i++){ if(Math.abs(a5)%i===0) divs.push(i*(pick([1,-1]))); }
      var x5=pick(divs), x6=pick(divs);
      var tries=0; while((x6===x5 || Math.abs(x6)===Math.abs(x5)) && tries++<50) x6=pick(divs);
      if(x6===x5 || x6===0) { x5=1; x6=-2; a5=a5-a5%2 || 2; }
      var y5=a5/x5;
      if(!(Number.isInteger(y5)) || !Number.isInteger(a5/x6) || x6===x5) return genHirei();
      return {kind:'text', text:'y は x に反比例し、x = '+sn(x5)+' のとき y = '+sn(y5)+' である。x = '+sn(x6)+' のときの y の値は？', explain:'比例定数は xy = '+pn(x5)+' × '+pn(y5)+' = '+sn(a5)+'。y = '+sn(a5)+'/x に x = '+sn(x6)+' を代入して y = '+sn(a5/x6)+'。', answers:[{type:'int',value:a5/x6}]};
    }
    if(t===5){
      // グラフが通る点から式 → mkCard
      var a7=nz(-7,7), x7=nz(-5,5);
      if(Math.abs(a7)===1) a7*=2;
      var y7=a7*x7;
      var ok='y = '+lin(a7,0);
      var wr=['y = '+lin(y7-x7,0), 'y = '+(x7<0?'':'')+sn(a7*x7*0+ (y7 + x7) ) + 'x', 'y = '+lin(-a7,0), 'y = '+sn(x7*y7)+'/x', 'y = '+lin(a7+1,0), 'y = '+lin(a7-1,0)];
      wr=[lin(-a7,0), lin(a7+1,0), lin(a7-1,0), lin(x7,0), lin(a7+x7,0)].map(function(s){return 'y = '+s;}).concat(['y = '+fracHTMLRaw(sn(x7*y7),'x').replace(/^/,'')]);
      return mkCard('原点を通る直線のグラフが点 ('+sn(x7)+', '+sn(y7)+') を通る。この関数の式は？', ok, wr, '比例の式は y = ax。x = '+sn(x7)+'、y = '+sn(y7)+' を代入して a = '+sn(y7)+' ÷ '+pn(x7)+' = '+sn(a7)+'。');
    }
    // 反比例の式
    var p=nz(-6,6), q=nz(-6,6), a8=p*q;
    var ok8='y = '+fracHTMLRaw(sn(a8),'x');
    var sp=(p+q===0?a8+2:p+q), sa1=(a8+1===0?a8+3:a8+1), sa2=(a8-1===0?a8-3:a8-1);
    var wr8=['y = '+fracHTMLRaw(sn(-a8),'x'), 'y = '+lin(a8,0), 'y = '+fracHTMLRaw(sn(sp),'x'), 'y = '+lin(q===0?1:Math.round(q/p*100)/100===Math.round(q/p) ? q/p : a8+1,0), 'y = '+fracHTMLRaw(sn(sa1),'x'), 'y = '+fracHTMLRaw(sn(sa2),'x')];
    if(a8===0) return genHirei();
    return mkCard('y は x に反比例し、x = '+sn(p)+' のとき y = '+sn(q)+' である。y を x の式で表すと？', ok8, wr8, '反比例は y = a/x で表せる。a = xy = '+pn(p)+' × '+pn(q)+' = '+sn(a8)+'。');
  }

  // ---------- 6. 方程式の利用・比例式 ----------
  function genBun(){
    var t=rand(0,6);
    if(t===0){
      var x=rand(2,9), a=pick([80,90,120,150,180,200]), b=pick([100,150,200,250,300]);
      var tot=a*x+b;
      return {kind:'text', text:'1個 '+a+'円のりんごを x 個と、'+b+'円のかごを1つ買ったら、代金の合計が '+tot+'円だった。りんごの個数 x は？', explain:a+'x + '+b+' = '+tot+' より '+a+'x = '+(tot-b)+'、x = '+x+'。', answers:[{type:'int',value:x,unit:'個'}]};
    }
    if(t===1){
      // 速さ 追いつく
      var s=rand(2,5)*5/5, a2=pick([60,70,80,90]), diff=pick([10,20,30,40]);
      var tm=rand(3,12); // 追いつくまでの時間(分) 弟が出発してから
      var head=(a2+diff)*tm-a2*tm; // 差
      // 兄: 分速a2、弟が tm 分後に出発...
      var lead=diff*tm/ a2; // 兄が先に進んだ時間
      var h=rand(3,10);
      var b=a2+diff*0;
      // 単純版: 兄が分速a、h分先に出発。弟が分速a+diff で追う → 追いつく時間 = a*h/diff
      var h2=rand(2,8); var a3=pick([50,60,70,80,90]); var d3=pick([10,20,30,40,50]);
      var ttt=a3*h2/d3;
      if(!Number.isInteger(ttt)) return genBun();
      return {kind:'text', text:'兄が分速 '+a3+'m で家を出発した '+h2+'分後に、弟が分速 '+(a3+d3)+'m で同じ道を追いかけた。弟が出発してから何分後に兄に追いつく？', explain:'弟が出発して x 分後に追いつくとすると、'+(a3+d3)+'x = '+a3+'(x + '+h2+')。'+d3+'x = '+(a3*h2)+' より x = '+ttt+'。', answers:[{type:'int',value:ttt,unit:'分後'}]};
    }
    if(t===2){
      // 割引
      var pr=rand(2,9)*100+rand(0,5)*100; var rate=pick([10,20,30,40]);
      var sale=pr*(100-rate)/100;
      if(!Number.isInteger(sale)) return genBun();
      return {kind:'text', text:'ある商品を定価の '+rate+'% 引きで売ったら '+sale+'円だった。この商品の定価は？', explain:'定価を x 円とすると x × '+((100-rate)/100)+' = '+sale+'。x = '+sale+' ÷ '+((100-rate)/100)+' = '+pr+'。', answers:[{type:'int',value:pr,unit:'円'}]};
    }
    if(t===3){
      // 比例式 a : b = x : c
      var a4=rand(2,9), k=rand(2,6), b4=rand(2,9);
      while(b4===a4) b4=rand(2,9);
      var x4=b4*k, c4=a4*k;
      // a4 : b4 = x : ? => choose x unknown at front
      return {kind:'text', text:a4+' : '+b4+' = x : '+(b4*k)+' のとき x = ', explain:'比例式では「内側の積＝外側の積」。'+b4+'x = '+a4+' × '+(b4*k)+'、x = '+(a4*k)+'。', answers:[{type:'int',value:a4*k}]};
    }
    if(t===4){
      // 過不足
      var n=rand(8,30), a5=rand(2,6), extra=rand(2,9);
      var c5=a5+rand(1,3);
      // n x a + extra = c*n - lack  => lack = c*n - a*n - extra >0
      var lack=(c5-a5)*n-extra;
      if(lack<=0) return genBun();
      var items=a5*n+extra;
      return {kind:'text', text:'子どもたちにおはじきを '+a5+'個ずつ配ると '+extra+'個あまり、'+c5+'個ずつ配ると '+lack+'個たりない。子どもの人数は？', explain:'人数を x 人とすると '+a5+'x + '+extra+' = '+c5+'x − '+lack+'。'+lin(c5-a5,0)+' = '+(extra+lack)+' より x = '+n+'。', answers:[{type:'int',value:n,unit:'人'}]};
    }
    if(t===5){
      // 速さ: 2地点間 時速
      var v1=pick([3,4,5,6]), v2=pick([8,10,12,15]);
      // 行きは時速v1km, 帰りは時速v2km。往復にかかった時間T。距離? → d/v1 + d/v2 = T
      var L=lcm(v1,v2), dd=L*rand(1,3);
      var T=dd/v1+dd/v2;
      return {kind:'text', text:'A地点からB地点まで、行きは時速 '+v1+'km、帰りは時速 '+v2+'km で往復したら、合わせて '+T+'時間かかった。A、B間の道のりは何km？', explain:'道のりを x km とすると x/'+v1+' + x/'+v2+' = '+T+'。両辺に '+L+' をかけて '+(L/v1)+'x + '+(L/v2)+'x = '+(T*L)+'、x = '+dd+'。', answers:[{type:'int',value:dd,unit:'km'}]};
    }
    // 比: 男女
    var r1=rand(2,5), r2=rand(2,7), m=rand(3,9);
    while(r1===r2) r2=rand(2,7);
    var g1=r1*m, g2=r2*m;
    return {kind:'text', text:'男子と女子の人数の比が '+r1+' : '+r2+' で、男子が '+g1+'人のとき、女子は何人？', explain:'女子を x 人とすると '+r1+' : '+r2+' = '+g1+' : x。'+r1+'x = '+r2+' × '+g1+' より x = '+g2+'。', answers:[{type:'int',value:g2,unit:'人'}]};
  }

  // ---------- 7. おうぎ形と立体 ----------
  function pi(k){ return (k===1?'':String(k))+'π'; }
  function genOugi(){
    var t=rand(0,7);
    var angs=[45,60,72,90,120,135,144,150,180,240,270];
    if(t<=1){
      var r=rand(2,15), th=pick(angs), tries=0;
      while((2*r*th)%360!==0 && tries++<200){ r=rand(2,15); th=pick(angs); }
      if((2*r*th)%360!==0) return genOugi();
      var arc=2*r*th/360;
      var ok=pi(arc)+' cm';
      var wr=[pi(arc*2)+' cm', pi(r*th/360*1===Math.round(r*th/360)?r*th/360:arc+1)+' cm', pi(arc+1)+' cm', pi(arc+2)+' cm', pi(Math.max(1,arc-1))+' cm', pi(Math.max(1,arc-2))+' cm', pi(2*r)+' cm'];
      return mkCard('半径 '+r+'cm、中心角 '+th+'° のおうぎ形の弧の長さは？', ok, wr, '弧の長さ = 2π×半径×(中心角/360)。2π×'+r+'×'+fracHTMLRaw(th,360)+' = '+ok+'。');
    }
    if(t<=3){
      var r2=rand(2,15), th2=pick(angs), tries2=0;
      while((r2*r2*th2)%360!==0 && tries2++<300){ r2=rand(2,15); th2=pick(angs); }
      if((r2*r2*th2)%360!==0) return genOugi();
      var area=r2*r2*th2/360;
      var ok2=pi(area)+' cm²';
      var arcv=2*r2*th2/360;
      var wr2=[pi(area*2)+' cm²', pi(r2*r2)+' cm²', pi(area+1)+' cm²', pi(area+2)+' cm²', pi(Math.max(1,area-1))+' cm²', pi(Math.max(1,area-2))+' cm²'];
      return mkCard('半径 '+r2+'cm、中心角 '+th2+'° のおうぎ形の面積は？', ok2, wr2, '面積 = π×半径²×(中心角/360)。π×'+r2+'²×'+fracHTMLRaw(th2,360)+' = '+ok2+'。');
    }
    if(t===4){
      // 弧の長さから中心角
      var r3=rand(3,12), th3=pick(angs), tries3=0;
      while((2*r3*th3)%360!==0 && tries3++<300){ r3=rand(3,12); th3=pick(angs); }
      if((2*r3*th3)%360!==0) return genOugi();
      var arc3=2*r3*th3/360;
      return {kind:'text', text:'半径 '+r3+'cm、弧の長さ '+arc3+'π cm のおうぎ形の中心角は？', explain:'円周は 2π×'+r3+' = '+(2*r3)+'π cm。弧の長さは円周の '+arc3+'/'+(2*r3)+' だから、中心角は 360° × '+arc3+'/'+(2*r3)+' = '+th3+'°。', answers:[{type:'int',value:th3,unit:'°'}]};
    }
    if(t===5){
      // 円柱
      var r4=rand(2,9), h4=rand(2,12);
      if(rand(0,1)===0){
        var ok4=pi(r4*r4*h4)+' cm³';
        var wr4=[pi(r4*r4*h4/3===Math.round(r4*r4*h4/3)?r4*r4*h4/3:r4*r4*h4+r4)+' cm³', pi(r4*h4)+' cm³', pi(2*r4*h4)+' cm³', pi(4*r4*r4*h4)+' cm³', pi(r4*r4*h4+r4)+' cm³', pi(r4*r4*h4+1)+' cm³'];
        return mkCard('底面の半径 '+r4+'cm、高さ '+h4+'cm の円柱の体積は？', ok4, wr4, '体積 = 底面積×高さ。π×'+r4+'²×'+h4+' = '+ok4+'。');
      } else {
        var sv=2*r4*r4+2*r4*h4;
        var ok5=pi(sv)+' cm²';
        var wr5=[pi(r4*r4*h4)+' cm²', pi(r4*r4+2*r4*h4)+' cm²', pi(2*r4*h4)+' cm²', pi(r4*r4+r4*h4)+' cm²', pi(sv+r4)+' cm²', pi(sv+1)+' cm²'];
        return mkCard('底面の半径 '+r4+'cm、高さ '+h4+'cm の円柱の表面積は？', ok5, wr5, '表面積 = 底面積×2 + 側面積。底面2つで 2π×'+r4+'² = '+(2*r4*r4)+'π、側面は 2π×'+r4+'×'+h4+' = '+(2*r4*h4)+'π。合計 '+ok5+'。');
      }
    }
    if(t===6){
      // 円錐
      var r6=rand(2,9);
      if(rand(0,1)===0){
        var h6=3*rand(1,4);
        var vol=r6*r6*h6/3;
        var ok6=pi(vol)+' cm³';
        var wr6=[pi(r6*r6*h6)+' cm³', pi(vol*2)+' cm³', pi(r6*h6/3===Math.round(r6*h6/3)?r6*h6/3:vol+r6)+' cm³', pi(vol+1)+' cm³', pi(vol+r6)+' cm³', pi(Math.max(1,vol-1))+' cm³'];
        return mkCard('底面の半径 '+r6+'cm、高さ '+h6+'cm の円錐の体積は？', ok6, wr6, '円錐の体積 = 底面積×高さ×'+fracHTMLRaw(1,3)+'。π×'+r6+'²×'+h6+'×'+fracHTMLRaw(1,3)+' = '+ok6+'。');
      } else {
        var l6=r6+rand(2,8);
        var sv6=r6*r6+r6*l6;
        var ok7=pi(sv6)+' cm²';
        var wr7=[pi(r6*l6)+' cm²', pi(r6*r6+2*r6*l6)+' cm²', pi(2*r6*r6+r6*l6)+' cm²', pi(r6*r6*l6)+' cm²', pi(sv6+r6)+' cm²', pi(sv6+1)+' cm²'];
        return mkCard('底面の半径 '+r6+'cm、母線の長さ '+l6+'cm の円錐の表面積は？', ok7, wr7, '表面積 = 底面積 + 側面積。底面は π×'+r6+'² = '+(r6*r6)+'π、側面はおうぎ形で π×'+l6+'×'+r6+' = '+(r6*l6)+'π。合計 '+ok7+'。');
      }
    }
    // 球
    var r8=pick([3,6,9]);
    if(rand(0,1)===0){
      var v8=4*r8*r8*r8/3;
      var ok8=pi(v8)+' cm³';
      var wr8=[pi(4*r8*r8*r8)+' cm³', pi(r8*r8*r8/3)+' cm³', pi(4*r8*r8)+' cm³', pi(v8/2)+' cm³', pi(v8+r8)+' cm³', pi(v8*2)+' cm³'];
      return mkCard('半径 '+r8+'cm の球の体積は？', ok8, wr8, '球の体積 = '+fracHTMLRaw(4,3)+'π×半径³。'+fracHTMLRaw(4,3)+'π×'+r8+'³ = '+ok8+'。');
    } else {
      var r9=rand(2,12);
      var s9=4*r9*r9;
      var ok9=pi(s9)+' cm²';
      var wr9=[pi(s9/4)+' cm²', pi(2*r9*r9)+' cm²', pi(s9*r9/3===Math.round(s9*r9/3)?s9*r9/3:s9+r9)+' cm²', pi(3*r9*r9)+' cm²', pi(s9+r9)+' cm²', pi(s9*2)+' cm²'];
      return mkCard('半径 '+r9+'cm の球の表面積は？', ok9, wr9, '球の表面積 = 4π×半径²。4π×'+r9+'² = '+ok9+'。');
    }
  }

  // ---------- 8. 資料の整理 ----------
  function sortedNums(a){ return a.slice().sort(function(x,y){return x-y;}); }
  function genShiryo(){
    var t=rand(0,6);
    if(t===0){
      // 平均値(割り切れる)
      var n=pick([4,5,6,8]), m=rand(45,80), arr=[], i, s=0;
      for(i=0;i<n-1;i++){ var v=m+rand(-12,12); arr.push(v); s+=v; }
      var last=m*n-s; arr.push(last);
      if(last<0 || last>100 ) return genShiryo();
      arr=shuffle(arr);
      return {kind:'text', text:'次のデータの平均値は？  '+arr.join(', '), explain:'合計 = '+arr.join(' + ')+' = '+(m*n)+'。'+(m*n)+' ÷ '+n+' = '+m+'。', answers:[{type:'int',value:m}]};
    }
    if(t===1){
      // 中央値(奇数個)
      var n1=pick([5,7,9]), arr1=[], j;
      var set={};
      while(arr1.length<n1){ var v1=rand(3,40); if(!set[v1]){ set[v1]=1; arr1.push(v1);} }
      var sr=sortedNums(arr1), med=sr[(n1-1)/2];
      return {kind:'text', text:'次のデータの中央値(メジアン)は？  '+shuffle(arr1).join(', '), explain:'小さい順に並べると '+sr.join(', ')+'。真ん中の '+((n1+1)/2)+' 番目の値が中央値で '+med+'。', answers:[{type:'int',value:med}]};
    }
    if(t===2){
      // 中央値(偶数個 → 中央2つの平均が整数)
      var n2=pick([4,6,8]), arr2, sr2, mid, ok=false, cnt=0;
      while(!ok && cnt++<100){
        arr2=[]; var st={};
        while(arr2.length<n2){ var v2=rand(3,40); if(!st[v2]){ st[v2]=1; arr2.push(v2);} }
        sr2=sortedNums(arr2);
        var a=sr2[n2/2-1], b=sr2[n2/2];
        if((a+b)%2===0){ ok=true; mid=(a+b)/2; }
      }
      if(!ok) return genShiryo();
      var A=sr2[n2/2-1], B=sr2[n2/2];
      return {kind:'text', text:'次のデータの中央値(メジアン)は？  '+shuffle(arr2).join(', '), explain:'小さい順に並べると '+sr2.join(', ')+'。データの個数が偶数なので、真ん中の2つ '+A+' と '+B+' の平均 ('+A+' + '+B+') ÷ 2 = '+mid+' が中央値。', answers:[{type:'int',value:mid}]};
    }
    if(t===3){
      // 最頻値
      var mode=rand(2,30), k=rand(3,4), arr3=[], q;
      for(q=0;q<k;q++) arr3.push(mode);
      var used={}; used[mode]=1;
      var others=rand(4,6), c=0;
      while(c<others){ var v3=rand(2,30); if(!used[v3]){ used[v3]=1; arr3.push(v3); c++; if(rand(0,3)===0 && c<others){ arr3.push(v3); c++; used[v3]=1; } } }
      // 最頻値以外は最大2回まで、modeはk>=3回 なので一意
      return {kind:'text', text:'次のデータの最頻値(モード)は？  '+shuffle(arr3).join(', '), explain:'最も多く出てくる値が最頻値。'+mode+' が '+k+' 回で最も多い。', answers:[{type:'int',value:mode}]};
    }
    if(t===4){
      // 相対度数
      var N=pick([20,25,40,50,80,100]);
      var f=rand(1,Math.floor(N/2));
      var val=f/N;
      if(Math.abs(Math.round(val*1000)/1000-val)>1e-9) return genShiryo();
      var ok4=String(Math.round(val*1000)/1000);
      var f10=Math.round(val*1000)/1000;
      var wr=[String(Math.round(val*10000)/1000), String(Math.round(val*100)/1000*10/10*0.1===0?0.05:Math.round(val*100)/10000), String(Math.round((f/(N+f))*1000)/1000), String(Math.round((N/f)*100)/100), String(Math.round(val*1000+10)/1000), String(Math.round(val*1000+50)/1000), String(f10*10)];
      var rd=function(v){ return String(Math.round(v*100000)/100000); };
      wr=[rd(f10*10), rd(f10/10), String(Math.round(f/(N+f)*1000)/1000), String(Math.round((f10+0.1)*1000)/1000), String(Math.round((f10+0.05)*1000)/1000), String(Math.round((Math.abs(f10-0.1)+0.02)*1000)/1000)];
      return mkCard('度数の合計が '+N+' の度数分布表で、ある階級の度数が '+f+' のとき、その階級の相対度数は？', ok4, wr, '相対度数 = その階級の度数 ÷ 度数の合計。'+f+' ÷ '+N+' = '+ok4+'。');
    }
    if(t===5){
      // 平均から欠けた値
      var n5=pick([5,6]), m5=rand(50,80), arr5=[], s5=0, x;
      for(x=0;x<n5-1;x++){ var v5=m5+rand(-15,15); arr5.push(v5); s5+=v5; }
      var miss=m5*n5-s5;
      if(miss<0||miss>100) return genShiryo();
      return {kind:'text', text:n5+'人のテストの平均点は '+m5+'点。そのうち '+(n5-1)+'人の得点は '+arr5.join('点, ')+'点 だった。残りの1人の得点は？', explain:''+n5+'人の合計点は '+m5+' × '+n5+' = '+(m5*n5)+'。既知の '+(n5-1)+'人の合計は '+s5+' なので、'+(m5*n5)+' − '+s5+' = '+miss+'。', answers:[{type:'int',value:miss,unit:'点'}]};
    }
    // 範囲
    var n6=rand(6,9), arr6=[], st6={};
    while(arr6.length<n6){ var v6=rand(5,60); if(!st6[v6]){ st6[v6]=1; arr6.push(v6);} }
    var mx=Math.max.apply(null,arr6), mn=Math.min.apply(null,arr6);
    return {kind:'text', text:'次のデータの範囲(レンジ)は？  '+arr6.join(', '), explain:'範囲 = 最大値 − 最小値。最大値 '+mx+'、最小値 '+mn+' なので '+mx+' − '+mn+' = '+(mx-mn)+'。', answers:[{type:'int',value:mx-mn}]};
  }

  registerMath('s_j1', [
    {id:'j1_seifu', name:'正負の数の加減乗除', gen:function(){ return rand(0,2)===0 ? genSeifuFrac() : genSeifu(); }},
    {id:'j1_pow', name:'累乗と四則の混合計算', gen:genPow},
    {id:'j1_moji', name:'文字式の計算', gen:genMoji},
    {id:'j1_eq', name:'一次方程式', gen:genEq},
    {id:'j1_hirei', name:'比例・反比例', gen:genHirei},
    {id:'j1_bun', name:'方程式の利用・比例式', gen:genBun},
    {id:'j1_ougi', name:'おうぎ形と立体の体積・表面積', gen:genOugi},
    {id:'j1_shiryo', name:'資料の整理', gen:genShiryo}
  ]);
})();
