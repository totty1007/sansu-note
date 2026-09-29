/* 高校 数学III 問題生成 (s_h3) */
(function(){
  var M='−';
  var CC=' + C';
  function ab(n){ return Math.abs(n); }
  function sg(n){ return n<0 ? M+ab(n) : String(n); }
  function R(n,d){
    if(d===undefined) d=1;
    if(d<0){ n=-n; d=-d; }
    var g=gcd(n,d); n=n/g; d=d/g;
    if(n===0){ n=0; d=1; }
    return [n,d];
  }
  // 有理数 -> HTML
  function rstr(n,d){
    var r=R(n,d); n=r[0]; d=r[1];
    return d===1 ? sg(n) : (n<0?M:'')+fracHTMLRaw(ab(n),d);
  }
  // 係数(直後に文字が続く用)  1→'' , −1→'−'
  function cR(n,d){
    var r=R(n,d); n=r[0]; d=r[1];
    if(d===1) return n===1 ? '' : (n===-1 ? M : sg(n));
    return (n<0?M:'')+fracHTMLRaw(ab(n),d);
  }
  function cN(n){ return cR(n,1); }
  // 有理数×記号(π など)
  function rpi(n,d,sym){
    sym=sym||'π';
    var r=R(n,d); n=r[0]; d=r[1];
    if(n===0) return '0';
    var c=(ab(n)===1?'':String(ab(n)))+sym;
    return (n<0?M:'')+(d===1 ? c : fracHTMLRaw(c,d));
  }
  // 多項式 (降べきの係数配列)
  function P(cs,v){
    v=v||'x';
    var deg=cs.length-1, s='', first=true;
    for(var i=0;i<cs.length;i++){
      var c=cs[i], e=deg-i;
      if(!c) continue;
      var a=ab(c), body;
      if(e===0) body=String(a);
      else body=(a===1?'':String(a))+v+(e===1?'':sup(e));
      if(first){ s=(c<0?M:'')+body; first=false; }
      else s+=(c<0?' − ':' + ')+body;
    }
    return first ? '0' : s;
  }
  // {指数:係数} -> 降べき配列
  function mapArr(map,maxE){
    var a=[];
    for(var e=maxE;e>=0;e--) a.push(map[e]||0);
    return a;
  }
  function maxKey(map){ var m=0; for(var k in map){ if(map[k] && +k>m) m=+k; } return m; }
  function PM(map,v){ return P(mapArr(map,maxKey(map)),v); }
  function lim(s,e){ return 'lim<sub>'+s+'</sub> '+e; }
  function pw(base,e){ return e===1 ? '('+base+')' : '('+base+')'+sup(e); }
  function xp(k){ return k===0 ? '1' : (k===1 ? 'x' : 'x'+sup(k)); }
  function ee(k){ return k===1 ? 'e' : 'e'+sup(k); }
  function axs(a){ return (a===1?'':String(a))+'x'; }
  function INT(l,u){ return '∫['+l+'→'+u+'] '; }
  // 有理数の答え問題
  function mkR(q,cor,wr,ex,fmt,extra){
    fmt=fmt||rstr;
    var c=R(cor[0],cor[1]);
    var seen={}; seen[c[0]+'/'+c[1]]=1;
    var out=[];
    function add(r){
      r=R(r[0],r[1]);
      var k=r[0]+'/'+r[1];
      if(seen[k]) return;
      seen[k]=1; out.push(fmt(r[0],r[1]));
    }
    (wr||[]).forEach(function(w){ if(w) add(w); });
    (extra||[]).forEach(function(s){ out.push(s); });
    [[c[0]+c[1],c[1]],[c[0]-c[1],c[1]],[-c[0],c[1]],[2*c[0],c[1]],[c[0],2*c[1]],[c[0]+2*c[1],c[1]],[c[0]-2*c[1],c[1]]].forEach(add);
    return mkCard(q, fmt(c[0],c[1]), out, ex);
  }
  // 符号つき項の連結 [[分子,分母,記号HTML],...]
  function SS(items){
    var out='';
    items.forEach(function(it){
      var r=R(it[0],it[1]); if(r[0]===0) return;
      var n=r[0], d=r[1], neg=n<0, an=ab(n), body;
      if(d===1) body=(an===1?'':String(an))+it[2];
      else body=fracHTMLRaw(an,d)+it[2];
      out+= out ? (neg?' − ':' + ')+body : (neg?M:'')+body;
    });
    return out||'0';
  }
  // 対数の誤答(k log b の典型誤り。正解と同値になるものは除く)
  function logWrongs(k,b){
    var w=['log '+(b+1),cN(k)+'log '+(b-1),fracHTMLRaw('log '+b,k+1),cN(k+1)+'log '+b,cN(k)+'log '+(b+1)];
    if(k>1 && k*b!==Math.pow(b,k)) w.push('log '+(k*b));
    if(k===1) w.push('2 log '+b);
    return w;
  }
  function pk(k){ return k===1 ? 'π' : 'π/'+k; }
  function nonzero(lo,hi){ var v=0; while(v===0) v=rand(lo,hi); return v; }

  /* ===== 1. 数列の極限・無限等比級数 ===== */
  function genSeq(){
    var t=rand(0,5), a, b, c, d, e, f, q, r;
    if(t===0){
      a=nonzero(-6,6); b=rand(-5,5); c=rand(1,5); d=rand(1,6);
      q=lim('n→∞', fracHTMLRaw(P([a,b],'n'),P([c,d],'n')))+' の値を求めよ。';
      return mkR(q,R(a,c),[R(b,d),R(c,a),R(a,1),R(0,1)],
        '分子・分母を n で割ると、n→∞ のとき '+rstr(b,1)+'/n や '+d+'/n は 0 に近づくので、極限値は '+rstr(a,c)+' 。');
    }
    if(t===1){
      a=nonzero(-5,5); b=rand(-4,4); c=rand(-4,4); d=rand(1,4); e=rand(0,4); f=rand(1,5);
      q=lim('n→∞', fracHTMLRaw(P([a,b,c],'n'),P([d,e,f],'n')))+' の値を求めよ。';
      var w1=(e!==0)?R(b,e):R(a+b,d);
      return mkR(q,R(a,d),[R(d,a),w1,R(a,1),R(0,1)],
        '分子・分母を n'+sup(2)+' で割ると、最高次の係数の比 '+rstr(a,d)+' に近づく。');
    }
    if(t===2){
      if(rand(0,1)===0){
        a=nonzero(-5,5); b=rand(-4,4); c=rand(1,4); d=rand(0,4); e=rand(1,5);
        q=lim('n→∞', fracHTMLRaw(P([a,b],'n'),P([c,d,e],'n')))+' の値を求めよ。';
        return mkR(q,R(0,1),[R(a,c),R(b,e),R(c,a)],
          '分母の次数(2次)の方が分子の次数(1次)より大きいので、分子・分母を n'+sup(2)+' で割ると 0 に収束する。',rstr,['∞（正の無限大に発散）']);
      } else {
        a=nonzero(-4,4); b=rand(-4,4); c=rand(1,5); d=rand(1,4); e=rand(1,5);
        q=lim('n→∞', fracHTMLRaw(P([a,b,c],'n'),P([d,e],'n')))+' の値を求めよ。';
        var PI='∞（正の無限大に発散）', NI='−∞（負の無限大に発散）';
        var cor=a>0?PI:NI;
        return mkCard(q,cor,[a>0?NI:PI,'0',rstr(a,d),rstr(a,1)],
          '分子の次数(2次)の方が分母の次数(1次)より大きい。分子・分母を n で割ると、分子は '+(a>0?'正':'負')+'の無限大に発散するので '+cor+' 。');
      }
    }
    if(t===3){
      var rr=rand(3,5), s=rand(1,2), A=rand(1,4), B=rand(1,5), C=rand(1,3);
      var sp=(s===1)?'1':s+sup('n');
      var num=(A===1?'':A+'·')+rr+sup('n+1')+' + '+(s===1?String(B):(B===1?'':B+'·')+sp);
      var den=rr+sup('n')+' + '+(s===1?String(C):(C===1?'':C+'·')+sp);
      q=lim('n→∞', fracHTMLRaw(num,den))+' の値を求めよ。';
      return mkR(q,R(A*rr,1),[R(A,1),R(rr,1),R(A*rr+B,1),R(B,C)],
        '分母・分子を '+rr+sup('n')+' で割ると、('+s+'/'+rr+')'+sup('n')+' → 0 となる。分子は '+(A===1?'':A+'·')+rr+' に近づき、分母は 1 に近づくので '+(A*rr)+' 。');
    }
    if(t===4){
      var qq=rand(2,6), p, rn, rd, sgn=rand(0,1)?1:-1;
      do{ p=rand(1,qq-1); }while(gcd(p,qq)!==1);
      rn=sgn*p; rd=qq;
      if(rand(0,1)===0){
        a=nonzero(-9,9);
        q='初項 '+sg(a)+'、公比 '+rstr(rn,rd)+' の無限等比級数の和を求めよ。';
        return mkR(q,R(a*rd,rd-rn),[R(a*rd,rd+rn),R(a*rd,rn),R(a*(rd-rn),rd),R(a*rn,rd-rn)],
          '|公比| < 1 なので収束し、和は 初項 ÷ (1 − 公比) = '+sg(a)+' ÷ (1 − ('+rstr(rn,rd)+')) = '+rstr(a*rd,rd-rn)+' 。');
      } else {
        a=rand(1,6);
        q='無限級数 Σ<sub>n=1</sub><sup>∞</sup> '+cN(a)+'('+rstr(rn,rd)+')'+sup('n')+' の和を求めよ。';
        return mkR(q,R(a*rn,rd-rn),[R(a*rd,rd-rn),R(a*rn,rd+rn),R(a*rd,rd+rn),R(a*rn,rd)],
          'n=1 のときの項(初項)は '+a+'·('+rstr(rn,rd)+') = '+rstr(a*rn,rd)+'、公比は '+rstr(rn,rd)+' 。和は 初項 ÷ (1 − 公比) = '+rstr(a*rn,rd-rn)+' 。');
      }
    }
    // t===5 循環小数
    var kind=rand(0,3), v, den2, disp, wr2;
    if(kind===0){
      v=rand(1,8); disp='0.<span style="text-decoration:overline">'+v+'</span>';
      return mkR('循環小数 '+disp+' を分数で表せ。',R(v,9),[R(v,10),R(v,90),R(v,99)],
        '初項 '+v+'/10、公比 1/10 の無限等比級数と考えて ('+v+'/10)÷(9/10) = '+rstr(v,9)+' 。');
    }
    if(kind===1){
      do{ v=rand(10,98); }while(v%11===0);
      disp='0.<span style="text-decoration:overline">'+v+'</span>';
      return mkR('循環小数 '+disp+' を分数で表せ。',R(v,99),[R(v,100),R(v,90),R(v,999),R(v,9)],
        '初項 '+v+'/100、公比 1/100 の無限等比級数と考えると、和は '+v+'/99 を約分して '+rstr(v,99)+' 。');
    }
    if(kind===2){
      do{ v=rand(101,998); }while(v%37===0 || v%111===0);
      disp='0.<span style="text-decoration:overline">'+v+'</span>';
      return mkR('循環小数 '+disp+' を分数で表せ。',R(v,999),[R(v,1000),R(v,99),R(v,900),R(v,9999)],
        '初項 '+v+'/1000、公比 1/1000 の無限等比級数と考えると、和は '+v+'/999 を約分して '+rstr(v,999)+' 。');
    }
    var d1=rand(1,9), e1=rand(1,9);
    while(d1===e1 || e1===9) e1=rand(1,8);
    v=10*d1+e1;
    disp='0.'+d1+'<span style="text-decoration:overline">'+e1+'</span>';
    return mkR('循環小数 '+disp+' を分数で表せ。',R(9*d1+e1,90),[R(v,99),R(v,90),R(v,100),R(d1+e1,9)],
      '0.'+d1+' + 0.0'+e1+e1+'… と考え、'+d1+'/10 + ('+e1+'/100)÷(9/10) = '+d1+'/10 + '+e1+'/90 = '+rstr(9*d1+e1,90)+' 。');
  }

  /* ===== 2. 関数の極限 ===== */
  function genLimFun(){
    var t=rand(0,4), a, b, c, d, e, f, q;
    if(t===0){
      if(rand(0,1)===0){
        a=rand(-3,4); do{ b=rand(-4,4); }while(b===a);
        q=lim('x→'+sg(a), fracHTMLRaw(P([1,-(a+b),a*b]),P([1,-a])))+' の値を求めよ。';
        return mkR(q,R(a-b,1),[R(b-a,1),R(a+b,1),R(a*b,1),R(0,1)],
          '分子を因数分解すると (x − '+sg(a).replace(M,'(−')+(a<0?')':'')+')(x − '+(b<0?'('+sg(b)+')':b)+')。約分して x→'+sg(a)+' とすると '+sg(a)+' − '+(b<0?'('+sg(b)+')':b)+' = '+sg(a-b)+' 。');
      }
      var n=rand(3,4); do{ a=rand(-3,3); }while(a===0);
      var an=Math.pow(a,n);
      var cs=[1]; for(var i=1;i<n;i++) cs.push(0); cs.push(-an);
      q=lim('x→'+sg(a), fracHTMLRaw(P(cs),P([1,-a])))+' の値を求めよ。';
      return mkR(q,R(n*Math.pow(a,n-1),1),[R(n*an,1),R(Math.pow(a,n-1),1),R((n-1)*Math.pow(a,n-1),1),R(n*a,1)],
        '因数分解して約分すると (x'+sup(n)+' − a'+sup(n)+')/(x − a) = x'+sup(n-1)+' + … + a'+sup(n-1)+' (n個の和)。x→a で n·a'+sup(n-1)+' = '+sg(n*Math.pow(a,n-1))+' 。');
    }
    if(t===1){
      var s=rand(0,3);
      if(s===0){
        a=nonzero(-5,5); b=rand(-4,4); c=rand(-4,4); d=nonzero(-4,4); e=rand(-4,4); f=rand(-4,4);
        q=lim('x→∞', fracHTMLRaw(P([a,b,c]),P([d,e,f])))+' の値を求めよ。';
        return mkR(q,R(a,d),[R(d,a),R(a,1),R(0,1),(e!==0?R(b,e):R(a+b,d))],
          '分子・分母を x'+sup(2)+' で割ると、最高次の係数の比 '+rstr(a,d)+' に近づく。');
      }
      if(s===1){
        a=nonzero(-6,6); b=rand(-5,5); c=nonzero(-4,4); d=rand(-5,5);
        q=lim('x→∞', fracHTMLRaw(P([a,b]),P([c,d])))+' の値を求めよ。';
        return mkR(q,R(a,c),[R(c,a),R(b,d===0?1:d),R(a,1),R(0,1)],
          '分子・分母を x で割ると、b/x や d/x が 0 に近づくので、最高次の係数の比 '+rstr(a,c)+' になる。');
      }
      if(s===2){
        a=nonzero(-5,5); b=rand(-4,4); c=nonzero(-4,4); d=rand(-4,4); e=rand(-4,4);
        q=lim('x→∞', fracHTMLRaw(P([a,b]),P([c,d,e])))+' の値を求めよ。';
        return mkR(q,R(0,1),[R(a,c),R(c,a),R(a,1)],
          '分母の次数(2次)が分子の次数(1次)より大きいので 0 に収束する。',rstr,['∞（正の無限大に発散）']);
      }
      a=nonzero(-4,4); b=rand(-4,4); c=rand(-4,4); d=nonzero(-4,4); e=rand(-4,4);
      var PIN='∞（正の無限大に発散）', NIN='−∞（負の無限大に発散）';
      var pos=(a>0)===(d>0);
      q=lim('x→∞', fracHTMLRaw(P([a,b,c]),P([d,e])))+' の値を求めよ。';
      return mkCard(q,pos?PIN:NIN,[pos?NIN:PIN,'0',rstr(a,d),rstr(a,1)],
        '分子の次数(2次)が分母の次数(1次)より大きい。最高次の項の比 '+P([a,0,0]).replace('x'+sup(2),'x'+sup(2))+'/'+P([d,0]) +' の符号から、'+(pos?'正':'負')+'の無限大に発散する。');
    }
    if(t===2){
      var v=rand(0,4);
      a=rand(1,6); b=rand(1,6);
      if(v===0){
        q=lim('x→0', fracHTMLRaw('sin '+axs(a), axs(b)))+' の値を求めよ。';
        return mkR(q,R(a,b),[R(b,a),R(a*b,1),R(a,1),R(1,1)],
          'sin(t)/t → 1 を使う。sin '+axs(a)+'/'+axs(b)+' = {sin '+axs(a)+'/('+axs(a)+')} × '+a+'/'+b+' → 1 × '+a+'/'+b+' = '+rstr(a,b)+' 。');
      }
      if(v===1){
        if(a===b) b=b%6+1;
        q=lim('x→0', fracHTMLRaw('sin '+axs(a),'sin '+axs(b)))+' の値を求めよ。';
        return mkR(q,R(a,b),[R(b,a),R(a*b,1),R(a,1),R(1,1)],
          '分子・分母を x で割り、sin(kx)/x → k を使うと '+a+'/'+b+' = '+rstr(a,b)+' 。');
      }
      if(v===2){
        q=lim('x→0', fracHTMLRaw('1 − cos '+axs(a),'x'+sup(2)))+' の値を求めよ。';
        return mkR(q,R(a*a,2),[R(a,2),R(a*a,1),R(1,2),R(a,1)],
          '分子・分母に 1 + cos '+axs(a)+' を掛けると sin'+sup(2)+' '+axs(a)+' /(x'+sup(2)+'(1+cos '+axs(a)+')) → '+a+sup(2)+'/2 = '+rstr(a*a,2)+' 。');
      }
      if(v===3){
        q=lim('x→0', fracHTMLRaw('tan '+axs(a), axs(b)))+' の値を求めよ。';
        return mkR(q,R(a,b),[R(b,a),R(a*b,1),R(a,1),R(1,1)],
          'tan t = sin t / cos t なので、tan '+axs(a)+'/'+axs(b)+' = {sin '+axs(a)+'/('+axs(a)+')} × (1/cos '+axs(a)+') × '+a+'/'+b+' → 1 × 1 × '+a+'/'+b+' = '+rstr(a,b)+' 。');
      }
      a=rand(2,7);
      q=lim('x→∞', 'x sin'+' '+fracHTMLRaw(a,'x'))+' の値を求めよ。';
      return mkR(q,R(a,1),[R(1,a),R(0,1),R(1,1),R(a*a,1)],
        't = 1/x とおくと x→∞ は t→0。x sin('+a+'/x) = '+a+'·sin('+a+'t)/('+a+'t) → '+a+' 。');
    }
    if(t===3){
      var u=rand(0,2);
      if(u===0){
        a=nonzero(-9,9);
        q=lim('x→∞', sqrtHTML(P([1,a,0]))+' − x')+' の値を求めよ。';
        return mkR(q,R(a,2),[R(a,1),R(a,4),R(0,1),R(-a,2)],
          '有理化すると ('+P([1,a,0])+' − x'+sup(2)+')/(√(…)+x) = '+axs(a)+'/(√(…)+x)。x で割って x→∞ とすると '+a+'/(1+1) = '+rstr(a,2)+' 。');
      }
      if(u===1){
        a=rand(1,8);
        q=lim('x→∞', 'x − '+sqrtHTML(P([1,-a,0])))+' の値を求めよ。';
        return mkR(q,R(a,2),[R(a,1),R(-a,2),R(a,4),R(0,1)],
          '有理化すると ('+axs(a)+')/(x+√(…))。x で割って x→∞ とすると '+a+'/(1+1) = '+rstr(a,2)+' 。');
      }
      a=rand(-6,6); do{ c=rand(-6,6); }while(c===a); b=rand(0,5); d=rand(0,5);
      q=lim('x→∞', sqrtHTML(P([1,a,b]))+' − '+sqrtHTML(P([1,c,d])))+' の値を求めよ。';
      return mkR(q,R(a-c,2),[R(a+c,2),R(a-c,4),R(a-c,1),R(0,1)],
        '有理化すると分子は '+P([a-c,b-d])+'、分母は √(…)+√(…)。x で割って x→∞ とすると ('+sg(a-c)+')/(1+1) = '+rstr(a-c,2)+' 。');
    }
    // t===4
    var qq=rand(2,5), p=rand(1,qq*qq-1); a=qq*qq-p;
    q=lim('x→'+a, fracHTMLRaw(sqrtHTML(P([1,p]))+' − '+qq, P([1,-a])))+' の値を求めよ。';
    return mkR(q,R(1,2*qq),[R(1,qq),R(2*qq,1),R(qq,2),R(1,1)],
      '分子を有理化すると ((x+'+p+') − '+(qq*qq)+')/(√(x+'+p+')+'+qq+') = (x − '+a+')/(√(x+'+p+')+'+qq+')。約分して x→'+a+' とすると 1/('+qq+'+'+qq+') = '+rstr(1,2*qq)+' 。');
  }

  /* ===== 3. 微分の計算 ===== */
  function genBibun(){
    var t=rand(0,11), a, b, n, A, q, cor;
    if(t===0){
      a=nonzero(-4,4); b=rand(1,5);
      q='f(x) = (x '+(a<0?'− '+ab(a):'+ '+a)+')(x'+sup(2)+' + '+b+') のとき、f′(x) = ?';
      cor=P([3,2*a,b]);
      return mkCard(q,cor,[P([2,0]),P([3,a,b]),P([3,2*a,-b]),P([1,2*a,b])],
        '積の微分法より f′(x) = 1·(x'+sup(2)+' + '+b+') + (x '+(a<0?'− '+ab(a):'+ '+a)+')·2x = '+cor+' 。');
    }
    if(t===1){
      do{ a=nonzero(-5,5); }while(ab(a)<2); b=nonzero(-5,5); n=rand(2,6);
      var base=P([a,b]);
      q='f(x) = ('+base+')'+sup(n)+' のとき、f′(x) = ?';
      cor=cN(n*a)+pw(base,n-1);
      return mkCard(q,cor,[cN(n)+pw(base,n-1),cN(a)+pw(base,n-1),cN(n*a)+pw(base,n),cN(n*a)+pw(base,n+1)],
        '合成関数の微分法より、(ax+b)'+sup('n')+' の微分は n·a·(ax+b)'+sup('n−1')+'。よって f′(x) = '+n+'·'+sg(a)+'·('+base+')'+(n-1===1?'':sup(n-1))+' = '+cor+' 。');
    }
    if(t===2){
      A=nonzero(-5,5); b=rand(2,5); var bx=axs(b);
      q='f(x) = '+cN(A)+'sin '+bx+' のとき、f′(x) = ?';
      cor=cN(A*b)+'cos '+bx;
      return mkCard(q,cor,[cN(A)+'cos '+bx,cN(-A*b)+'cos '+bx,cN(A*b)+'sin '+bx,cN(-A*b)+'sin '+bx],
        '(sin '+bx+')′ = '+b+' cos '+bx+'(内側の微分 '+b+' を掛ける)。よって f′(x) = '+cor+' 。');
    }
    if(t===3){
      A=nonzero(-5,5); b=rand(2,5); var bx3=axs(b);
      q='f(x) = '+cN(A)+'cos '+bx3+' のとき、f′(x) = ?';
      cor=cN(-A*b)+'sin '+bx3;
      return mkCard(q,cor,[cN(A*b)+'sin '+bx3,cN(-A)+'sin '+bx3,cN(A*b)+'cos '+bx3,cN(-A*b)+'cos '+bx3],
        '(cos '+bx3+')′ = −'+b+' sin '+bx3+'。よって f′(x) = '+cor+' 。');
    }
    if(t===4){
      if(rand(0,1)===0){
        A=nonzero(-5,5); b=rand(2,5);
        q='f(x) = '+cN(A)+'e'+sup(axs(b))+' のとき、f′(x) = ?';
        cor=cN(A*b)+'e'+sup(axs(b));
        return mkCard(q,cor,[cN(A)+'e'+sup(axs(b)),cN(A*b)+'x e'+sup(axs(b)+' − 1'),cN(A*b)+'e'+sup('('+b+'−1)x'),cN(A)+'e'+sup(axs(b)+' + 1')],
          '(e'+sup(axs(b))+')′ = '+b+' e'+sup(axs(b))+'。よって f′(x) = '+cor+' 。');
      }
      a=rand(2,4);
      q='f(x) = e'+sup(a+'x'+sup(2))+' のとき、f′(x) = ?';
      cor=cN(2*a)+'x e'+sup(a+'x'+sup(2));
      return mkCard(q,cor,[cN(a)+'x e'+sup(a+'x'+sup(2)),cN(2*a)+'e'+sup(a+'x'+sup(2)),cN(2*a)+'x e'+sup(2*a+'x'),'e'+sup(a+'x'+sup(2))],
        '指数部 '+a+'x'+sup(2)+' の微分 '+(2*a)+'x を掛けて f′(x) = '+cor+' 。');
    }
    if(t===5){
      a=rand(2,5); b=rand(1,6);
      var lin=P([a,b]);
      q='f(x) = log('+lin+') (対数は自然対数)のとき、f′(x) = ?';
      cor=fracHTMLRaw(a,lin);
      return mkCard(q,cor,[fracHTMLRaw(1,lin),fracHTMLRaw(lin,a),fracHTMLRaw(a,'('+lin+')'+sup(2)),fracHTMLRaw(1,'x')],
        '{log g(x)}′ = g′(x)/g(x) より、f′(x) = '+a+'/('+lin+') 。');
    }
    if(t===6){
      n=rand(2,4);
      q='f(x) = x'+sup(n)+' log x (x>0)のとき、f′(x) = ?';
      cor=xp(n-1)+'('+n+' log x + 1)';
      return mkCard(q,cor,[xp(n-1)+'('+n+' log x − 1)',n+xp(n-1)+' log x',xp(n-1)+'(log x + '+n+')',xp(n-1)+'(log x + 1)'],
        '積の微分法より f′(x) = '+n+xp(n-1)+' log x + x'+sup(n)+'·(1/x) = '+cor+' 。');
    }
    if(t===7){
      b=rand(2,4);
      q='f(x) = x e'+sup(axs(b))+' のとき、f′(x) = ?';
      cor='(1 + '+b+'x)e'+sup(axs(b));
      return mkCard(q,cor,['(1 + x)e'+sup(axs(b)),b+'x e'+sup(axs(b)),'(1 − '+b+'x)e'+sup(axs(b)),'(x + '+b+')e'+sup(axs(b))],
        '積の微分法より f′(x) = 1·e'+sup(axs(b))+' + x·'+b+'e'+sup(axs(b))+' = '+cor+' 。');
    }
    if(t===8){
      a=rand(1,9);
      var den='x'+sup(2)+' + '+a;
      q='f(x) = '+fracHTMLRaw('x',den)+' のとき、f′(x) = ?';
      cor=fracHTMLRaw(a+' − x'+sup(2),'('+den+')'+sup(2));
      return mkCard(q,cor,[fracHTMLRaw('x'+sup(2)+' − '+a,'('+den+')'+sup(2)),fracHTMLRaw(a+' − x'+sup(2),den),fracHTMLRaw('3x'+sup(2)+' + '+a,'('+den+')'+sup(2)),fracHTMLRaw(1,'2x')],
        '商の微分法より f′(x) = {1·('+den+') − x·2x}/('+den+')'+sup(2)+' = '+cor+' 。');
    }
    if(t===9){
      b=rand(2,4);
      q='f(x) = tan '+axs(b)+' のとき、f′(x) = ?';
      cor=fracHTMLRaw(b,'cos'+sup(2)+' '+axs(b));
      return mkCard(q,cor,[fracHTMLRaw(1,'cos'+sup(2)+' '+axs(b)),fracHTMLRaw(b,'sin'+sup(2)+' '+axs(b)),fracHTMLRaw(M+b,'cos'+sup(2)+' '+axs(b)),fracHTMLRaw(1,'cos '+axs(b))],
        '(tan t)′ = 1/cos'+sup(2)+' t に内側の微分 '+b+' を掛けて f′(x) = '+cor+' 。');
    }
    if(t===10){
      b=rand(2,4);
      q='f(x) = sin'+sup(2)+' '+axs(b)+' のとき、f′(x) = ?';
      cor=(2*b)+' sin '+axs(b)+' cos '+axs(b);
      return mkCard(q,cor,[(2)+' sin '+axs(b)+' cos '+axs(b),(2*b)+' sin '+axs(b),b+' sin '+axs(b)+' cos '+axs(b),(2*b)+' cos'+sup(2)+' '+axs(b)],
        '合成関数の微分法より、外側 u'+sup(2)+' の微分 2u と 内側 sin '+axs(b)+' の微分 '+b+' cos '+axs(b)+' を掛けて f′(x) = '+cor+' 。');
    }
    a=nonzero(-4,4); b=rand(2,5);
    q='f(x) = (x '+(a<0?'− '+ab(a):'+ '+a)+') sin '+axs(b)+' のとき、f′(x) = ?';
    var ax1='x '+(a<0?'− '+ab(a):'+ '+a);
    cor='sin '+axs(b)+' + '+b+'('+ax1+') cos '+axs(b);
    return mkCard(q,cor,['cos '+axs(b),'sin '+axs(b)+' − '+b+'('+ax1+') cos '+axs(b),'sin '+axs(b)+' + ('+ax1+') cos '+axs(b),b+' cos '+axs(b)],
      '積の微分法より f′(x) = 1·sin '+axs(b)+' + ('+ax1+')·'+b+' cos '+axs(b)+' = '+cor+' 。');
  }

  /* ===== 4. 微分の応用 ===== */
  function genOuyou(){
    var t=rand(0,7), p, q0, c, k, m, n0, y0, txt, cor, a;
    if(t===0){
      p=rand(-3,3); q0=rand(-5,5); var tt=rand(-2,3); c=rand(-4,4);
      var f=function(x){ return x*x*x+p*x*x+q0*x+c; };
      var fp=function(x){ return 3*x*x+2*p*x+q0; };
      txt='曲線 y = '+P([1,p,q0,c])+' 上の x = '+sg(tt)+' の点における接線の傾きを求めよ。';
      return mkR(txt,R(fp(tt),1),[R(f(tt),1),R(3*tt*tt+p*tt+q0,1),R(3*tt*tt+2*p*tt,1),R(3*tt*tt-2*p*tt+q0,1)],
        'y′ = '+P([3,2*p,q0])+' に x = '+sg(tt)+' を代入して '+sg(fp(tt))+' 。');
    }
    if(t===1){
      p=rand(-3,3); q0=rand(-4,4); c=rand(-4,4); var tv=rand(-1,2);
      var g=function(x){ return x*x*x+p*x*x+q0*x+c; };
      m=3*tv*tv+2*p*tv+q0; y0=g(tv); n0=y0-m*tv;
      var eq=function(mm,nn){ return 'y = '+P([mm,nn]); };
      cor=eq(m,n0);
      txt='曲線 y = '+P([1,p,q0,c])+' 上の点 ('+sg(tv)+', '+sg(y0)+') における接線の方程式を求めよ。';
      return mkCard(txt,cor,[eq(m,y0),eq(m,-n0),eq(m,y0+m*tv),eq(y0,n0),eq(m+1,n0),eq(m,n0+1),eq(m,n0-1)],
        'y′ = '+P([3,2*p,q0])+'、x = '+sg(tv)+' での傾きは '+sg(m)+'。接線は y − ('+sg(y0)+') = '+sg(m)+'(x − ('+sg(tv)+')) より '+cor+' 。');
    }
    if(t===2||t===3){
      p=rand(-3,2); q0=p+rand(1,4); c=rand(-3,5);
      var F=function(x){ return 2*x*x*x-3*(p+q0)*x*x+6*p*q0*x+c; };
      var fexp=P([2,-3*(p+q0),6*p*q0,c]);
      var deriv='6x'+sup(2)+(p+q0?' '+(p+q0>0?'− ':'+ ')+ab(6*(p+q0))+'x':'')+(p*q0?' '+(p*q0>0?'+ ':'− ')+ab(6*p*q0):'');
      var fac='6(x − '+(p<0?'('+sg(p)+')':p)+')(x − '+(q0<0?'('+sg(q0)+')':q0)+')';
      if(t===2){
        var wantMax=rand(0,1)===0;
        txt='関数 f(x) = '+fexp+' が '+(wantMax?'極大':'極小')+'になる x の値を求めよ。';
        var ans=wantMax?p:q0, oth=wantMax?q0:p;
        return mkR(txt,R(ans,1),[R(oth,1),R(p+q0,1),R(0,1),R(-ans,1)],
          'f′(x) = '+deriv+' = '+fac+'。x = '+sg(p)+', '+sg(q0)+' で符号が変わり、x'+sup(3)+' の係数が正なので x = '+sg(p)+' で極大、x = '+sg(q0)+' で極小。');
      }
      var wm=rand(0,1)===0;
      txt='関数 f(x) = '+fexp+' の'+(wm?'極大値':'極小値')+'を求めよ。';
      var av=wm?F(p):F(q0), ov=wm?F(q0):F(p);
      return mkR(txt,R(av,1),[R(ov,1),R(c,1),R(F(0)+F(1),1),R(-av,1)],
        'f′(x) = '+fac+' より 極大は x = '+sg(p)+'、極小は x = '+sg(q0)+'。'+(wm?'極大値 f('+sg(p)+')':'極小値 f('+sg(q0)+')')+' = '+sg(av)+' 。');
    }
    if(t===4){
      k=rand(1,3); c=rand(-3,4);
      var lo=-rand(1,3), hi=rand(1,3);
      if(rand(0,1)===0){ var tmp=lo; lo=-hi; hi=-tmp; }
      var h=function(x){ return x*x*x-3*k*k*x+c; };
      var cands=[lo,hi]; if(-k>lo && -k<hi) cands.push(-k); if(k>lo && k<hi) cands.push(k);
      var vals=cands.map(h);
      var wmax=rand(0,1)===0;
      var best=wmax?Math.max.apply(null,vals):Math.min.apply(null,vals);
      var other=wmax?Math.min.apply(null,vals):Math.max.apply(null,vals);
      txt='関数 f(x) = '+P([1,0,-3*k*k,c])+' ('+sg(lo)+' ≦ x ≦ '+sg(hi)+') の'+(wmax?'最大値':'最小値')+'を求めよ。';
      var wr=[R(other,1),R(h(lo),1),R(h(hi),1),R(c,1)];
      return mkR(txt,R(best,1),wr,
        'f′(x) = 3(x'+sup(2)+' − '+(k*k)+') = 3(x + '+k+')(x − '+k+')。区間内の極値をとる点と両端での値 '+cands.map(function(x){return 'f('+sg(x)+') = '+sg(h(x));}).join('、')+' を比べる。'+(wmax?'最大値':'最小値')+'は '+sg(best)+' 。');
    }
    if(t===5){
      k=rand(2,4); c=rand(-3,5);
      txt='関数 f(x) = '+P([1,0,-3*k*k,c])+' が増加する x の範囲を求めよ。';
      cor='x < '+M+k+', '+k+' < x';
      return mkCard(txt,cor,[M+k+' < x < '+k,'x < '+M+(k*k)+', '+(k*k)+' < x',M+(k*k)+' < x < '+(k*k),'x < '+k],
        'f′(x) = 3(x'+sup(2)+' − '+(k*k)+') = 3(x + '+k+')(x − '+k+')。f′(x) > 0 となるのは x < −'+k+' または x > '+k+' 。');
    }
    if(t===6){
      a=rand(2,5);
      txt='関数 f(x) = x e'+sup(M+a+'x')+' が極大になる x の値を求めよ。';
      return mkR(txt,R(1,a),[R(a,1),R(-1,a),R(1,a*a),R(0,1)],
        'f′(x) = (1 − '+a+'x)e'+sup(M+a+'x')+'。f′(x) = 0 より x = 1/'+a+'。この前後で f′ は正から負に変わるので極大。');
    }
    // t===7
    var s2=rand(2,6); a=s2*s2;
    txt='曲線 y = x'+sup(2)+' + '+a+' 上の点 (t, t'+sup(2)+' + '+a+') (t>0)における接線が原点を通るとき、t の値を求めよ。';
    return mkR(txt,R(s2,1),[R(a,1),R(-s2,1),R(s2*s2*2,1),R(s2+1,1)],
      '接線は y = 2t(x − t) + t'+sup(2)+' + '+a+'。原点を通るので 0 = −t'+sup(2)+' + '+a+' より t'+sup(2)+' = '+a+'。t>0 だから t = '+s2+' 。');
  }

  /* ===== 5. 不定積分 ===== */
  function genFutei(){
    var t=rand(0,8), a, b, A, n, q, cor;
    if(t===0){
      var exps=shuffle([0,1,2,3,4]).slice(0,rand(2,3));
      if(exps.every(function(e){return e===0;})) exps.push(2);
      var cm={}, um={};
      exps.forEach(function(e){ var u=nonzero(-4,4); um[e]=u; cm[e]=(e+1)*u; });
      var anti={}, deriv={}, nodiv={}, noraise={}, keep={};
      exps.forEach(function(e){
        anti[e+1]=um[e]; nodiv[e+1]=cm[e]; noraise[e]=um[e];
        if(e>=1) deriv[e-1]=(deriv[e-1]||0)+cm[e]*e;
        if(e>=1) keep[e+1]=um[e]; else keep[0]=cm[e];
      });
      q='不定積分 ∫('+PM(cm)+')dx を求めよ。（C は積分定数）';
      cor=PM(anti)+CC;
      var wl=[(PM(deriv)||'0')+CC, PM(nodiv)+CC, PM(noraise)+CC];
      if(exps.indexOf(0)>=0) wl.push(PM(keep)+CC);
      return mkCard(q,cor,wl,
        '∫x'+sup('n')+'dx = x'+sup('n+1')+'/(n+1) + C を各項に使う。係数は '+exps.map(function(e){ return sg(cm[e])+'÷'+(e+1)+' = '+sg(um[e]); }).join('、')+'。答えは '+cor+' 。');
    }
    if(t===1){
      A=nonzero(-4,4); b=rand(2,5);
      q='不定積分 ∫'+cN(A)+'sin '+axs(b)+' dx を求めよ。（C は積分定数）';
      cor=cR(-A,b)+'cos '+axs(b)+CC;
      return mkCard(q,cor,[cR(A,b)+'cos '+axs(b)+CC,cN(-A*b)+'cos '+axs(b)+CC,cR(-A,b)+'sin '+axs(b)+CC,cN(A*b)+'sin '+axs(b)+CC],
        '∫sin(bx)dx = −(1/b)cos(bx) + C 。よって '+cor+' 。');
    }
    if(t===2){
      A=nonzero(-4,4); b=rand(2,5);
      q='不定積分 ∫'+cN(A)+'cos '+axs(b)+' dx を求めよ。（C は積分定数）';
      cor=cR(A,b)+'sin '+axs(b)+CC;
      return mkCard(q,cor,[cR(-A,b)+'sin '+axs(b)+CC,cN(A*b)+'sin '+axs(b)+CC,cR(A,b)+'cos '+axs(b)+CC,cR(-A,b)+'cos '+axs(b)+CC],
        '∫cos(bx)dx = (1/b)sin(bx) + C 。よって '+cor+' 。');
    }
    if(t===3){
      A=nonzero(-4,4); b=rand(2,5);
      q='不定積分 ∫'+cN(A)+'e'+sup(axs(b))+' dx を求めよ。（C は積分定数）';
      cor=cR(A,b)+'e'+sup(axs(b))+CC;
      return mkCard(q,cor,[cN(A)+'e'+sup(axs(b))+CC,cN(A*b)+'e'+sup(axs(b))+CC,cR(-A,b)+'e'+sup(axs(b))+CC,cR(A,b)+'e'+sup(axs(b)+' + 1')+CC],
        '∫e'+sup('bx')+'dx = (1/b)e'+sup('bx')+' + C 。よって '+cor+' 。');
    }
    if(t===4){
      if(rand(0,1)===0){
        A=rand(2,6);
        q='不定積分 ∫'+fracHTMLRaw(A,'x')+' dx (x>0) を求めよ。（C は積分定数）';
        cor=A+' log x'+CC;
        return mkCard(q,cor,[fracHTMLRaw(A,'x'+sup(2))+CC,'log '+A+'x'+CC,fracHTMLRaw('log x',A)+CC,M+A+' log x'+CC],
          '∫(1/x)dx = log|x| + C より '+cor+'（x>0 なので絶対値は不要）。');
      }
      a=rand(2,5); b=rand(1,6); var lin=P([a,b]);
      q='不定積分 ∫'+fracHTMLRaw(1,lin)+' dx ('+lin+' > 0) を求めよ。（C は積分定数）';
      cor=cR(1,a)+'log('+lin+')'+CC;
      return mkCard(q,cor,['log('+lin+')'+CC,cN(a)+'log('+lin+')'+CC,cR(1,a)+'log x'+CC,fracHTMLRaw(1,lin+'')+CC],
        '内側の '+lin+' の x の係数が '+a+' なので、∫dx/(ax+b) = (1/a)log|ax+b| + C 。よって '+cor+' 。');
    }
    if(t===5){
      a=nonzero(-4,4); if(ab(a)<2) a=a<0?-2:2; b=nonzero(-5,5); n=rand(2,5);
      var l2=P([a,b]);
      q='不定積分 ∫('+l2+')'+sup(n)+' dx を求めよ。（C は積分定数）';
      var cf=a*(n+1);
      cor=(cf<0?M:'')+fracHTMLRaw(pw(l2,n+1),ab(cf))+CC;
      // 分子に符号: 分数全体に付ける
      return mkCard(q,cor,[fracHTMLRaw(pw(l2,n+1),n+1)+CC,fracHTMLRaw(pw(l2,n+1),ab(a))+CC,cN(a)+'/'+(n+1)+pw(l2,n+1)+CC,fracHTMLRaw(cN(n)+pw(l2,n-1),ab(a))+CC],
        '内側 '+l2+' の微分が '+sg(a)+' なので、∫(ax+b)'+sup('n')+'dx = (ax+b)'+sup('n+1')+'/{a(n+1)} + C 。分母は '+sg(a)+'×'+(n+1)+' = '+sg(cf)+' 。');
    }
    if(t===6){
      a=rand(1,5); n=rand(2,4);
      var inner='x'+sup(2)+' + '+a;
      q='不定積分 ∫2x('+inner+')'+sup(n)+' dx を求めよ。（C は積分定数）';
      cor=fracHTMLRaw(pw(inner,n+1),n+1)+CC;
      return mkCard(q,cor,[pw(inner,n+1)+CC,fracHTMLRaw(pw(inner,n+1),2*(n+1))+CC,fracHTMLRaw(pw(inner,n+1),n)+CC,fracHTMLRaw(pw(inner,n+1)+'·2x',n+1)+CC],
        'u = '+inner+' とおくと du = 2x dx。∫u'+sup(n)+'du = u'+sup(n+1)+'/'+(n+1)+' + C 。');
    }
    if(t===7){
      a=rand(1,6); var kk=nonzero(-8,8);
      if(ab(kk)<2) kk=2;
      var inn='x'+sup(2)+' + '+a;
      q='不定積分 ∫'+fracHTMLRaw(cN(kk)+'x',inn)+' dx を求めよ。（C は積分定数）';
      cor=cR(kk,2)+'log('+inn+')'+CC;
      return mkCard(q,cor,[cN(kk)+'log('+inn+')'+CC,cR(kk,2)+'log x'+CC,cR(kk,4)+'log('+inn+')'+CC,cR(kk,2)+fracHTMLRaw(1,inn)+CC],
        'u = '+inn+' とおくと du = 2x dx で、'+cN(kk)+'x dx = '+rstr(kk,2)+' du。∫(1/u)du = log u より '+cor+' 。');
    }
    // t===8: e^x 混合
    A=rand(2,5); b=rand(2,4);
    n=rand(2,4); var cc=rand(1,4);
    q='不定積分 ∫('+A+'e'+sup('x')+' + '+fracHTMLRaw(b,'x')+' + '+cc+')dx (x>0) を求めよ。（C は積分定数）';
    cor=A+'e'+sup('x')+' + '+b+' log x + '+(cc===1?'':cc)+'x'+CC;
    return mkCard(q,cor,[A+'e'+sup('x')+' − '+b+' log x + '+(cc===1?'':cc)+'x'+CC,A+'x e'+sup('x')+' + '+b+' log x + '+(cc===1?'':cc)+'x'+CC,A+'e'+sup('x')+' + '+fracHTMLRaw(b,'x'+sup(2))+' + '+(cc===1?'':cc)+'x'+CC,A+'e'+sup('x')+' + '+b+' log x + '+cc+CC],
      '∫e'+sup('x')+'dx = e'+sup('x')+'、∫(1/x)dx = log x、∫定数 dx = 定数×x を項ごとに使う。');
  }

  /* ===== 6. 定積分 ===== */
  function genTeiseki(){
    var t=rand(0,11), a, b, k, A, n, q, cor;
    if(t===0){
      var p, qq, c2, c1, c0, val, num;
      do{
        p=rand(-2,2); qq=p+rand(1,3);
        c2=nonzero(-3,3); c1=rand(-4,4); c0=rand(-4,4);
        num=2*c2*(Math.pow(qq,3)-Math.pow(p,3))+3*c1*(qq*qq-p*p)+6*c0*(qq-p);
      }while(num===0);
      var Fq=function(x){ return 2*c2*x*x*x+3*c1*x*x+6*c0*x; }; // 6F
      q=INT(sg(p),sg(qq))+'('+P([c2,c1,c0])+') dx の値を求めよ。';
      var nodiv=c2*(Math.pow(qq,3)-Math.pow(p,3))+c1*(qq*qq-p*p)+c0*(qq-p);
      return mkR(q,R(num,6),[R(-num,6),R(Fq(qq),6),R(nodiv,1),R(Fq(p),6)],
        '原始関数 F(x) = '+SS([[c2,3,'x'+sup(3)],[c1,2,'x'+sup(2)],[c0,1,'x']])+' を用いて F('+sg(qq)+') − F('+sg(p)+') = '+rstr(num,6)+' 。');
    }
    if(t===1){
      if(rand(0,1)===0){
        A=rand(1,5);
        q=INT('0','π')+cN(A)+'sin x dx の値を求めよ。';
        return mkR(q,R(2*A,1),[R(A,1),R(0,1),R(-2*A,1),R(4*A,1)],
          '[−'+cN(A)+'cos x]'+'<sub>0</sub><sup>π</sup> = '+A+'(1 + 1) = '+(2*A)+' 。',rstr,[A+'π']);
      }
      A=rand(1,5);
      q=INT('0','π/2')+cN(A)+'cos x dx の値を求めよ。';
      return mkR(q,R(A,1),[R(2*A,1),R(0,1),R(-A,1),R(A+1,1)],
        '['+cN(A)+'sin x]'+'<sub>0</sub><sup>π/2</sup> = '+A+'(1 − 0) = '+A+' 。');
    }
    if(t===2){
      k=rand(2,4);
      if(rand(0,1)===0){
        q=INT('0','π/'+k)+'sin '+axs(k)+' dx の値を求めよ。';
        return mkR(q,R(2,k),[R(1,k),R(2*k,1),R(k,1),R(0,1)],
          '[−(1/'+k+')cos '+axs(k)+']'+'<sub>0</sub><sup>π/'+k+'</sup> = (1/'+k+')(1 + 1) = '+rstr(2,k)+' 。');
      }
      q=INT('0','π/'+(2*k))+'cos '+axs(k)+' dx の値を求めよ。';
      return mkR(q,R(1,k),[R(2,k),R(k,1),R(1,2*k),R(0,1)],
        '[(1/'+k+')sin '+axs(k)+']'+'<sub>0</sub><sup>π/'+(2*k)+'</sup> = (1/'+k+')·sin(π/2) = '+rstr(1,k)+' 。');
    }
    if(t===3){
      a=rand(1,2); b=rand(2,3);
      q=INT('0',a)+'e'+sup(axs(b))+' dx の値を求めよ。';
      cor=fracHTMLRaw(ee(a*b)+' − 1',b);
      return mkCard(q,cor,[ee(a*b)+' − 1',fracHTMLRaw(ee(a*b),b),fracHTMLRaw(ee(a*b)+' + 1',b),fracHTMLRaw(ee(a)+' − 1',b),b+'('+ee(a*b)+' − 1)'],
        '[(1/'+b+')e'+sup(axs(b))+']'+'<sub>0</sub><sup>'+a+'</sup> = (1/'+b+')('+ee(a*b)+' − 1) 。');
    }
    if(t===4){
      if(rand(0,1)===0){
        k=rand(1,5); b=rand(2,9);
        q=INT('1',b)+fracHTMLRaw(k,'x')+' dx の値を求めよ。';
        cor=cN(k)+'log '+b;
        return mkCard(q,cor,logWrongs(k,b),
          '['+cN(k)+'log x]'+'<sub>1</sub><sup>'+b+'</sup> = '+cN(k)+'log '+b+' − '+cN(k)+'log 1 = '+cor+' 。');
      }
      n=rand(2,4);
      q=INT('1','e'+sup(n))+fracHTMLRaw(1,'x')+' dx の値を求めよ。';
      return mkR(q,R(n,1),[R(n-1,1),R(n+1,1),R(1,n),R(2*n,1)],
        '[log x]'+'<sub>1</sub><sup>e'+sup(n)+'</sup> = log e'+sup(n)+' − log 1 = '+n+' 。',rstr,['e'+sup(n)+' − 1']);
    }
    if(t===5){
      var s=rand(1,2); a=rand(1,2); n=rand(2,3);
      var hi=Math.pow(s*s+a,n+1), lo=Math.pow(a,n+1);
      q=INT('0',s)+'2x(x'+sup(2)+' + '+a+')'+sup(n)+' dx の値を求めよ。';
      return mkR(q,R(hi-lo,n+1),[R(hi-lo,1),R(hi-lo,2*(n+1)),R(Math.pow(s*s+a,n)-Math.pow(a,n),n)],
        'u = x'+sup(2)+' + '+a+' とおくと du = 2x dx、x: 0→'+s+' のとき u: '+a+'→'+(s*s+a)+'。∫u'+sup(n)+'du = [u'+sup(n+1)+'/'+(n+1)+']'+'<sub>'+a+'</sub><sup>'+(s*s+a)+'</sup> = ('+hi+' − '+lo+')/'+(n+1)+' 。');
    }
    if(t===6){
      k=rand(2,8);
      q=INT('0','1')+cN(k)+'x e'+sup('x'+sup(2))+' dx の値を求めよ。';
      cor=cR(k,2)+'(e − 1)';
      return mkCard(q,cor,[cN(k)+'(e − 1)',cR(k,2)+'(e + 1)',cR(k,2)+'e',cR(k,2)+'(e'+sup(2)+' − 1)'],
        'u = x'+sup(2)+' とおくと du = 2x dx。'+cN(k)+'x dx = ('+k+'/2)du なので ('+k+'/2)[e'+sup('u')+']'+'<sub>0</sub><sup>1</sup> = '+cor+' 。');
    }
    if(t===7){
      n=rand(2,4);
      q=INT('0','π/2')+'sin'+sup(n)+' x cos x dx の値を求めよ。';
      return mkR(q,R(1,n+1),[R(1,n),R(n,n+1),R(1,n+2),R(0,1)],
        'u = sin x とおくと du = cos x dx、x: 0→π/2 で u: 0→1。∫u'+sup(n)+'du = [u'+sup(n+1)+'/'+(n+1)+']'+'<sub>0</sub><sup>1</sup> = '+rstr(1,n+1)+' 。');
    }
    if(t===8){
      a=rand(2,3);
      q=INT('0',a)+'x e'+sup('x')+' dx の値を求めよ。';
      cor=cN(a-1)+ee(a)+' + 1';
      return mkCard(q,cor,[cN(a+1)+ee(a)+' − 1',cN(a-1)+ee(a)+' − 1',cN(a)+ee(a),cN(a-1)+ee(a)]  ,
        '部分積分法：∫x e'+sup('x')+'dx = x e'+sup('x')+' − e'+sup('x')+' 。[(x−1)e'+sup('x')+']'+'<sub>0</sub><sup>'+a+'</sup> = '+cor+' 。');
    }
    if(t===9){
      A=rand(1,4);
      if(rand(0,1)===0){
        q=INT('0','π')+cN(A)+'x sin x dx の値を求めよ。';
        return mkR(q,R(A,1),[R(-A,1),R(0,1),R(2*A,1),R(A+1,1)],
          '部分積分法：∫x sin x dx = −x cos x + sin x 。[−x cos x + sin x]'+'<sub>0</sub><sup>π</sup> = π 。したがって '+cN(A)+'π 。',
          function(n){ return n===0?'0':cN(n)+'π'; }.bind(null));
      }
      q=INT('0','π')+cN(A)+'x cos x dx の値を求めよ。';
      return mkR(q,R(-2*A,1),[R(2*A,1),R(0,1),R(-A,1),R(A*A*0+A,1)],
        '部分積分法：∫x cos x dx = x sin x + cos x 。[x sin x + cos x]'+'<sub>0</sub><sup>π</sup> = (0 − 1) − (0 + 1) = −2 。'+(A===1?'':A+' 倍して '+sg(-2*A)+' 。'));
    }
    if(t===10){
      A=rand(1,5);
      q=INT('1','e')+cN(A)+'log x dx の値を求めよ。';
      return mkR(q,R(A,1),[R(0,1),R(A+1,1),R(A-1,1),R(-A,1)],
        '部分積分法：∫log x dx = x log x − x 。[x log x − x]'+'<sub>1</sub><sup>e</sup> = (e − e) − (0 − 1) = 1 。'+(A===1?'':A+' 倍して '+A+' 。'),rstr,[cN(A)+'e']);
    }
    // t===11
    k=rand(1,4);
    q=INT('1','e')+cN(k)+'x log x dx の値を求めよ。';
    cor=cR(k,4)+'(e'+sup(2)+' + 1)';
    return mkCard(q,cor,[cR(k,4)+'(e'+sup(2)+' − 1)',cR(k,2)+'(e'+sup(2)+' + 1)',cR(k,4)+'(e'+sup(2)+' + 1)'.replace('e','e')+' − 1',cR(k,2)+'(e'+sup(2)+' − 1)',cR(k,4)+'e'+sup(2)],
      '部分積分法：∫x log x dx = (x'+sup(2)+'/2)log x − x'+sup(2)+'/4 。[…]'+'<sub>1</sub><sup>e</sup> = (e'+sup(2)+'/2 − e'+sup(2)+'/4) + 1/4 = (e'+sup(2)+' + 1)/4 。'+(k===1?'':k+' 倍して ')+cor+' 。');
  }

  /* ===== 7. 面積・体積 ===== */
  function genMenseki(){
    var t=rand(0,9), a, b, k, A, q, p, d;
    if(t===0){
      p=rand(-3,1); d=rand(2,6); var qq=p+d;
      var neg=rand(0,1)===0;
      q='曲線 y = '+P([neg?-1:1,(neg?1:-1)*(p+qq),(neg?-1:1)*p*qq])+' と x 軸で囲まれた図形の面積を求めよ。';
      return mkR(q,R(d*d*d,6),[R(d*d*d,3),R(d*d*d,2),R(d*d,2),R(d*d*d,12)],
        '交点は x = '+sg(p)+', '+sg(qq)+'。面積 = (1/6)|係数|('+qq+' − ('+sg(p)+'))'+sup(3)+' = '+d+sup(3)+'/6 = '+rstr(d*d*d,6)+' 。');
    }
    if(t===1){
      var al=rand(-3,1); d=rand(1,5); var be=al+d;
      q='放物線 y = x'+sup(2)+' と直線 y = '+P([al+be,-al*be])+' で囲まれた図形の面積を求めよ。';
      return mkR(q,R(d*d*d,6),[R(d*d*d,3),R(d*d*d,2),R(d*d,2),R(d*d*d,12)],
        'x'+sup(2)+' = '+P([al+be,-al*be])+' すなわち (x − ('+sg(al)+'))(x − '+sg(be)+') = 0 より x = '+sg(al)+', '+sg(be)+'。面積 = (1/6)('+be+' − ('+sg(al)+'))'+sup(3)+' = '+rstr(d*d*d,6)+' 。');
    }
    if(t===2){
      A=rand(1,4); k=rand(1,4);
      q='曲線 y = '+cN(A)+'sin '+axs(k)+' (0 ≦ x ≦ '+pk(k)+')と x 軸で囲まれた図形の面積を求めよ。';
      return mkR(q,R(2*A,k),[R(A,k),R(2*A*k,1),R(4*A,k),R(A,2*k)],
        '∫<sub>0</sub><sup>'+pk(k)+'</sup> '+cN(A)+'sin '+axs(k)+' dx = ['+cR(-A,k)+'cos '+axs(k)+']'+' = '+rstr(2*A,k)+' 。');
    }
    if(t===3){
      a=rand(1,3); b=rand(1,2);
      q='曲線 y = e'+sup(axs(a))+'、x 軸、y 軸および直線 x = '+b+' で囲まれた図形の面積を求めよ。';
      cor=a===1?ee(b)+' − 1':fracHTMLRaw(ee(a*b)+' − 1',a);
      var wl=(a===1) ? [ee(b),ee(b)+' + 1',ee(b)+' − 2',ee(b+1)+' − 1'] : [ee(a*b)+' − 1',fracHTMLRaw(ee(a*b),a),fracHTMLRaw(ee(a*b)+' + 1',a),a+'('+ee(a*b)+' − 1)',ee(a*b)];
      return mkCard(q,cor,wl,
        '面積 = ∫<sub>0</sub><sup>'+b+'</sup> e'+sup(axs(a))+' dx = '+(a===1?'':'(1/'+a+')')+'['+'e'+sup(axs(a))+']'+' = '+cor+' 。');
    }
    if(t===4){
      k=rand(1,4); b=rand(2,9);
      q='曲線 y = '+fracHTMLRaw(k,'x')+'、x 軸および直線 x = 1, x = '+b+' で囲まれた図形の面積を求めよ。';
      cor=cN(k)+'log '+b;
      return mkCard(q,cor,logWrongs(k,b),
        '面積 = ∫<sub>1</sub><sup>'+b+'</sup> '+k+'/x dx = ['+cN(k)+'log x]'+' = '+cor+' 。');
    }
    if(t===5){
      a=rand(1,4);
      q='曲線 y = √x と x 軸、直線 x = '+a+' で囲まれた図形を x 軸のまわりに1回転してできる立体の体積を求めよ。';
      return mkR(q,R(a*a,2),[R(a*a,4),R(a*a,1),R(a*a*a,3),R(2*a*a,3)],
        'V = π∫<sub>0</sub><sup>'+a+'</sup> (√x)'+sup(2)+' dx = π∫<sub>0</sub><sup>'+a+'</sup> x dx = π·'+a+sup(2)+'/2 = '+rpi(a*a,2)+' 。',rpi,[rstr(a*a,2)]);
    }
    if(t===6){
      a=rand(1,3);
      q='曲線 y = x'+sup(2)+' (0 ≦ x ≦ '+a+')を x 軸のまわりに1回転してできる立体の体積を求めよ。';
      var a5=Math.pow(a,5);
      return mkR(q,R(a5,5),[R(a*a*a,3),R(a5,4),R(a5,1),R(2*a5,5)],
        'V = π∫<sub>0</sub><sup>'+a+'</sup> (x'+sup(2)+')'+sup(2)+' dx = π∫ x'+sup(4)+' dx = π·'+a+sup(5)+'/5 = '+rpi(a5,5)+' 。',rpi,[rstr(a5,5)]);
    }
    if(t===7){
      k=rand(1,3); a=rand(1,4);
      q='直線 y = '+axs(k)+' (0 ≦ x ≦ '+a+')を x 軸のまわりに1回転してできる円錐の体積を求めよ。';
      return mkR(q,R(k*k*a*a*a,3),[R(k*a*a*a,3),R(k*k*a*a*a,1),R(k*k*a*a,2),R(k*k*a*a*a,9)],
        'V = π∫<sub>0</sub><sup>'+a+'</sup> ('+axs(k)+')'+sup(2)+' dx = π·'+(k*k)+'·'+a+sup(3)+'/3 = '+rpi(k*k*a*a*a,3)+' 。',rpi);
    }
    if(t===8){
      k=rand(1,3);
      q='曲線 y = sin '+axs(k)+' (0 ≦ x ≦ '+pk(k)+')を x 軸のまわりに1回転してできる立体の体積を求めよ。';
      var fm=function(n,dd){ return rpi(n,dd,'π'+sup(2)); };
      return mkR(q,R(1,2*k),[R(1,k),R(1,4*k),R(2,k),R(1,2)],
        'V = π∫<sub>0</sub><sup>'+pk(k)+'</sup> sin'+sup(2)+' '+axs(k)+' dx = π∫ (1 − cos '+axs(2*k)+')/2 dx = π·π/'+(2*k)+' = '+fm(1,2*k)+' 。',fm);
    }
    a=rand(1,2);
    q='曲線 y = e'+sup('x')+' (0 ≦ x ≦ '+a+')を x 軸のまわりに1回転してできる立体の体積を求めよ。';
    cor=fracHTMLRaw('π('+ee(2*a)+' − 1)',2);
    return mkCard(q,cor,['π('+ee(2*a)+' − 1)',fracHTMLRaw('π('+ee(a)+' − 1)',2),fracHTMLRaw('π('+ee(2*a)+' + 1)',2),fracHTMLRaw('π'+ee(2*a),2)],
      'V = π∫<sub>0</sub><sup>'+a+'</sup> (e'+sup('x')+')'+sup(2)+' dx = π∫ e'+sup('2x')+' dx = π[e'+sup('2x')+'/2]'+' = '+cor+' 。');
  }

  /* ===== 8. 複素数平面 ===== */
  // 成分 [係数, 0|3]  (3 なら 係数×√3)
  function comp(c){ return ab(c[0])===1&&c[1] ? sqrtHTML(3) : (c[1] ? ab(c[0])+sqrtHTML(3) : String(ab(c[0]))); }
  function zHTML(x,y){
    var out='';
    if(x[0]!==0) out+=(x[0]<0?M:'')+comp(x);
    if(y[0]!==0){
      var body=(!y[1]&&ab(y[0])===1) ? 'i' : comp(y)+'i';
      out+=out ? (y[0]<0?' − ':' + ')+body : (y[0]<0?M:'')+body;
    }
    return out||'0';
  }
  function zI(a,b){ return zHTML([a,0],[b,0]); }
  function sgn(v){ return v>0.001?1:(v<-0.001?-1:0); }
  // 偏角 deg の点 (半径は選ぶ k に従う)
  function mkZ(deg,k){
    var rad=deg*Math.PI/180, cx=Math.cos(rad), sy=Math.sin(rad), z={};
    if(deg%90===0){
      z.x=[sgn(cx)*k,0]; z.y=[sgn(sy)*k,0]; z.r=String(k);
    } else if(deg%45===0){
      z.x=[sgn(cx)*k,0]; z.y=[sgn(sy)*k,0]; z.r=(k===1?'':k)+sqrtHTML(2);
    } else if(deg%60===30){ // 30,150,210,330
      z.x=[sgn(cx)*k,3]; z.y=[sgn(sy)*k,0]; z.r=String(2*k);
    } else { // 60,120,240,300
      z.x=[sgn(cx)*k,0]; z.y=[sgn(sy)*k,3]; z.r=String(2*k);
    }
    return z;
  }
  function polar(r,deg){ return (r==='1'?'':r)+'(cos '+rpi(deg,180)+' + i sin '+rpi(deg,180)+')'; }
  var TRI=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15],[7,24,25],[20,21,29]];
  var DEGS=[30,45,60,90,120,135,150,180,210,225,240,270,300,315,330];
  function genFukuso(){
    var t=rand(0,6), tri, a, b, c, q, z, deg, k;
    if(t===0){
      tri=pick(TRI); a=tri[0]*pick([1,-1]); b=tri[1]*pick([1,-1]); c=tri[2];
      if(rand(0,1)){ var tmp=a; a=b; b=tmp; }
      q='複素数 z = '+zI(a,b)+' の絶対値 |z| を求めよ。';
      return mkR(q,R(c,1),[R(ab(a)+ab(b),1),R(c*c,1),R(ab(ab(a)-ab(b)),1),R(ab(a)*ab(b),1)],
        '|z| = √('+(a<0?'('+sg(a)+')':a)+sup(2)+' + '+(b<0?'('+sg(b)+')':b)+sup(2)+') = √'+(c*c)+' = '+c+' 。');
    }
    if(t===1){
      var t1=pick(TRI), t2=pick(TRI);
      var a1=t1[0]*pick([1,-1]), b1=t1[1]*pick([1,-1]), a2=t2[1]*pick([1,-1]), b2=t2[0]*pick([1,-1]);
      if(rand(0,1)===0){
        q='z'+'<sub>1</sub> = '+zI(a1,b1)+'、z<sub>2</sub> = '+zI(a2,b2)+' のとき、|z<sub>1</sub>z<sub>2</sub>| を求めよ。';
        return mkR(q,R(t1[2]*t2[2],1),[R(t1[2]+t2[2],1),R(ab(t1[2]-t2[2]),1),R(t1[2]*t2[2]*t1[2],1),R(t1[2],t2[2])],
          '|z<sub>1</sub>z<sub>2</sub>| = |z<sub>1</sub>||z<sub>2</sub>| = '+t1[2]+'×'+t2[2]+' = '+(t1[2]*t2[2])+' 。');
      }
      q='z'+'<sub>1</sub> = '+zI(a1,b1)+'、z<sub>2</sub> = '+zI(a2,b2)+' のとき、|z<sub>1</sub>/z<sub>2</sub>| を求めよ。';
      return mkR(q,R(t1[2],t2[2]),[R(t2[2],t1[2]),R(t1[2]*t2[2],1),R(t1[2]-t2[2],1),R(t1[2]+t2[2],1)],
        '|z<sub>1</sub>/z<sub>2</sub>| = |z<sub>1</sub>|/|z<sub>2</sub>| = '+t1[2]+'/'+t2[2]+' = '+rstr(t1[2],t2[2])+' 。');
    }
    if(t===2){
      deg=pick(DEGS); k=rand(1,3); z=mkZ(deg,k);
      q='複素数 z = '+zHTML(z.x,z.y)+' の偏角 θ (0 ≦ θ < 2π)を求めよ。';
      var conj=(360-deg)%360;
      return mkR(q,R(deg,180),[R((deg+180)%360,180),R(conj,180),R((90-deg+360)%360,180),R((180-deg+360)%360,180),R((deg+90)%360,180)],
        'z の実部・虚部の符号から象限を決め、絶対値 '+z.r+' の点の向きを考えると、偏角は θ = '+rpi(deg,180)+' 。',rpi);
    }
    if(t===3){
      deg=pick(DEGS); k=rand(1,3); z=mkZ(deg,k);
      q='複素数 z = '+zHTML(z.x,z.y)+' を極形式 r(cos θ + i sin θ) (r>0, 0 ≦ θ < 2π)で表せ。';
      var rw=(deg%90===0)?String(k*2):((deg%45===0)?String(2*k):String(k));
      return mkCard(q,polar(z.r,deg),[polar(z.r,(360-deg)%360),polar(z.r,(deg+180)%360),polar(z.r,(90-deg+360)%360),polar(rw,deg),polar(z.r,(180-deg+360)%360)],
        '|z| = '+z.r+'、偏角は '+rpi(deg,180)+'。よって z = '+polar(z.r,deg)+' 。');
    }
    if(t===4){
      deg=pick(DEGS); k=rand(1,3); z=mkZ(deg,k);
      q='z = '+polar(z.r,deg)+' を a + bi の形で表せ。';
      var nx=[-z.x[0],z.x[1]], ny=[-z.y[0],z.y[1]];
      return mkCard(q,zHTML(z.x,z.y),[zHTML(nx,z.y),zHTML(z.x,ny),zHTML(ny,z.x),zHTML(nx,ny),zHTML(z.y,z.x),zHTML(z.y,nx)],
        'cos '+rpi(deg,180)+' と sin '+rpi(deg,180)+' の値を代入して r 倍する。z = '+zHTML(z.x,z.y)+' 。');
    }
    if(t===5){
      var kind=rand(0,2);
      if(kind===0){
        var cxs=[[1,1],[1,-1],[-1,1],[-1,-1]], bs=pick(cxs), n=rand(3,10);
        var rea=1, ima=0, i;
        for(i=0;i<n;i++){ var nr=rea*bs[0]-ima*bs[1], ni=rea*bs[1]+ima*bs[0]; rea=nr; ima=ni; }
        var bstr=zI(bs[0],bs[1]);
        q='('+bstr+')'+sup(n)+' を a + bi の形で表せ。（ド・モアブルの定理を利用）';
        return mkCard(q,zI(rea,ima),[zI(ima,rea),zI(-rea,ima),zI(rea,-ima),zI(2*rea,2*ima),zI(-ima,-rea),zI(ima,-rea)],
          '|'+bstr+'| = √2、偏角は '+rpi(bs[0]>0?(bs[1]>0?45:315):(bs[1]>0?135:225),180)+'。n='+n+' 乗すると 絶対値は (√2)'+sup(n)+'、偏角は n 倍。計算すると '+zI(rea,ima)+' 。');
      }
      if(kind===1){
        var dgl=[30,60,120,150,210,240,300,330];
        deg=pick(dgl);
        var ns=[3,6,9]; n=pick(ns);
        z=mkZ(deg,1);
        var ang=(deg*n)%360, u=[[1,0],[0,1],[-1,0],[0,-1]][ang/90], m=Math.pow(2,n);
        q='('+zHTML(z.x,z.y)+')'+sup(n)+' を a + bi の形で表せ。（ド・モアブルの定理を利用）';
        return mkCard(q,zI(m*u[0],m*u[1]),[zI(u[0],u[1]),zI(2*u[0],2*u[1]),zI(-m*u[0],-m*u[1]),zI(m*u[1],m*u[0]),zI(-m*u[1],-m*u[0]),zI(m*u[1],-m*u[0])],
          zHTML(z.x,z.y)+' = '+polar('2',deg)+'。'+n+' 乗すると '+m+'(cos '+rpi(deg*n,180)+' + i sin '+rpi(deg*n,180)+') = '+zI(m*u[0],m*u[1])+' 。');
      }
      deg=pick([30,45,60,120,135,150,210,225,240,300,315,330]);
      var opts=[]; for(n=2;n<=12;n++){ if((deg*n)%90===0) opts.push(n); }
      n=pick(opts);
      var ang2=(deg*n)%360, u2=[[1,0],[0,1],[-1,0],[0,-1]][ang2/90];
      q='(cos '+rpi(deg,180)+' + i sin '+rpi(deg,180)+')'+sup(n)+' の値を求めよ。';
      var all=[zI(1,0),zI(0,1),zI(-1,0),zI(0,-1)], cor2=zI(u2[0],u2[1]);
      return mkCard(q,cor2,all.filter(function(s){return s!==cor2;}),
        'ド・モアブルの定理より cos '+rpi(deg*n,180)+' + i sin '+rpi(deg*n,180)+' 。偏角 '+(ang2)+'° の点なので '+cor2+' 。');
    }
    // t===6
    var d1=pick([30,45,60,90,120,135,150]), d2=pick([30,45,60,90,120,135,150]);
    if(rand(0,1)===0){
      q='arg z<sub>1</sub> = '+rpi(d1,180)+'、arg z<sub>2</sub> = '+rpi(d2,180)+' のとき、arg(z<sub>1</sub>z<sub>2</sub>) (0 ≦ arg < 2π)を求めよ。';
      var sm=(d1+d2)%360;
      return mkR(q,R(sm,180),[R(((d1-d2)%360+360)%360,180),R((d1+d2+180)%360,180),R(sm,360),R(((360-sm)%360),180)],
        '積の偏角は偏角の和。'+rpi(d1,180)+' + '+rpi(d2,180)+' = '+rpi(sm,180)+' 。',rpi);
    }
    q='arg z<sub>1</sub> = '+rpi(d1,180)+'、arg z<sub>2</sub> = '+rpi(d2,180)+' のとき、arg(z<sub>1</sub>/z<sub>2</sub>) (0 ≦ arg < 2π)を求めよ。';
    var df=((d1-d2)%360+360)%360;
    return mkR(q,R(df,180),[R((d1+d2)%360,180),R(((d2-d1)%360+360)%360,180),R((df+180)%360,180),R(df,360)],
      '商の偏角は偏角の差。'+rpi(d1,180)+' − '+rpi(d2,180)+' を 0 ≦ θ < 2π に直して '+rpi(df,180)+' 。',rpi);
  }

  registerMath('s_h3', [
    {id:'h3_seq',    name:'数列の極限・無限等比級数', gen:genSeq},
    {id:'h3_limfun', name:'関数の極限',               gen:genLimFun},
    {id:'h3_bibun',  name:'微分の計算',               gen:genBibun},
    {id:'h3_ouyou',  name:'微分の応用（接線・極値・最大最小）', gen:genOuyou},
    {id:'h3_futei',  name:'不定積分',                 gen:genFutei},
    {id:'h3_teiseki',name:'定積分',                   gen:genTeiseki},
    {id:'h3_menseki',name:'面積・体積',               gen:genMenseki},
    {id:'h3_fukuso', name:'複素数平面',               gen:genFukuso}
  ]);
})();
