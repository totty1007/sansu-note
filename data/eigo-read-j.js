registerDeck({id:'read_ej', level:'e_j', name:'長文読解', prompt:'', modes:['read'],
passages:{
p1:`Ken is a second-year student at a junior high school. Last month, his class decided to make a café for the school festival. Ken wanted to make cookies, but he had never baked before. His friend Aya was good at baking, so she taught him. They practiced after school for two weeks. At first, Ken's cookies were too hard. Aya said, "Don't give up. Use less flour next time." On the day of the festival, many people bought their cookies. Ken was very happy, and he said to Aya, "Thank you. I want to bake with you again."`,
p2:`Dear Emily,
Thank you for your e-mail. I'm glad to hear that you are coming to Japan next month. I will take you to Kyoto during your stay. We can visit old temples and eat Japanese sweets there. It takes about two hours from my town by train. Please bring a warm jacket because it is cool in the mornings and evenings in autumn. My mother will make dinner for you on the first night. She says she wants to make sushi with you. I can't wait to see you!
Your friend,
Yuki`,
p3:`Hiroshi belongs to the basketball team. He is not tall, so he often felt sad in games. One day, his coach said to him, "You are fast. That is your strength. Try to use it." After that, Hiroshi ran more every morning. Three months later, he became the best in his team at passing the ball quickly. In the last game of the year, his pass helped his team win. After the game, the coach said, "You didn't change your size, but you changed your way of playing." Hiroshi smiled.`,
p4:`Many people use plastic bags every day when they shop. But plastic bags are a big problem for the sea. Some sea animals eat them by mistake and get sick. In Japan, shops began to charge money for plastic bags in 2020. Because of this, more people bring their own bags, called "eco-bags." Now, in many towns, most people bring their own bags when they shop. Still, it is not enough. We should also try to use fewer things made of plastic, such as straws and bottles.`,
p5:`Last summer, my family went to Hokkaido. We flew from Tokyo, and it took about one and a half hours. On the first day, we visited a farm and saw many cows. I drank fresh milk for the first time, and it was so delicious that I drank two glasses. On the second day, it rained, so we couldn't go to the lake. Instead, we went to a museum and learned about the history of the area. My little brother was bored there, but he enjoyed the last day, when we ate seafood at a market. I want to visit again in winter.`,
p6:`The moon does not make its own light. We can see the moon because it reflects light from the sun. The shape of the moon looks different from day to day. This is because the moon moves around the earth, and we see different parts of its bright side. It takes about one month for the moon to go around the earth once. When the whole bright side faces us, we see a full moon. When we cannot see the bright side at all, we call it a new moon.`,
p7:`In Japan, people send New Year's cards, called nengajo, to their friends and family. If you send them before a certain day in December, the cards arrive on January 1st. Many people write a short message and add a picture of the animal of the year. Young people today often send messages by phone instead, but some of them still like paper cards. One girl said, "It is a little hard to write by hand, but when I get a card, I feel warm." Cards remind people of those they do not see often.`,
p8:`My grandmother lives alone in a small village. Every summer, I stay at her house for a week. She grows vegetables in her garden, and we pick tomatoes and cucumbers together in the morning. She always says, "Vegetables taste better when you pick them yourself." In the evening, we sit on the porch and eat watermelon. There is no convenience store near her house, and I can't use my phone well there. At first I didn't like it, but now I enjoy the quiet time. This summer, I will help her build a small shed for her tools.`,
p9:`Sleep is very important for students. Doctors say that teenagers need about eight to ten hours of sleep every night. However, many students sleep less than seven hours because they use smartphones late at night or study until midnight. Lack of sleep makes it hard to remember things and to stay calm. Experts say we should stop using phones an hour before going to bed. Reading a book or taking a warm bath can also help us sleep well.`,
p10:`Mai and Sara were best friends. One day, Mai saw Sara talking and laughing with other girls. Mai thought they were talking about her, so she did not speak to Sara for three days. On the fourth day, Sara came to Mai and said, "I am planning a surprise birthday party for you. I'm sorry I couldn't tell you." Mai was surprised and started to cry. She said, "I'm sorry. I should have asked you first." They hugged each other.`,
p11:`Robots are now used in many places. In some restaurants, robots carry dishes to the tables. In hospitals, they carry medicine, so nurses have more time to talk with patients. Some robots can also talk with old people who live alone. They are also useful in factories, where they work quickly and never get tired. But robots cannot do everything. They cannot understand people's feelings as well as humans can. So most people think robots should help us, not take our place.`,
p12:`On the first Sunday of every month, students from our school clean the beach near the station. Last time, about fifty students joined. We picked up cans, bottles, and pieces of plastic. One boy found an old shoe, and everyone laughed. After two hours, we had collected twenty bags of trash. A man who lives near the beach said to us, "Thank you. The beach is beautiful again." I felt proud, and I decided to join again next month. I also want to ask my family to come with me.`,
p13:`Last year, Tom came from Australia and stayed with our family for two weeks. He liked Japanese food, but natto was too difficult for him. When he tried it, he made a funny face, and we all laughed. He also taught us how to play cricket at a park. My father was not good at it, but he enjoyed it very much. On the last day, Tom cried at the station and said, "I will come back." Now we send messages to each other every week.`,
p14:`Our town library has a new service. You can borrow books with your smartphone. First, you download the library's app. Then you take a picture of the barcode on the book, so you do not need to see a staff member. You can also read some books on the app for free. The library hopes that more young people will use the library. The service started last month, and already 300 people are using it.`
},
items:[
// p1
{p:'p1', q:'ケンがアヤに教えてもらった理由は何ですか。', a:'アヤはお菓子作りが得意だったから', w:['アヤが同じクラスの委員長だったから','アヤの家がお菓子屋だったから','アヤがクッキーを食べたがったから'], t:'A', n:'Aya was good at baking, so she taught him. と書かれている。'},
{p:'p1', q:'ケンの最初のクッキーはどうでしたか。', a:'硬すぎた', w:['甘すぎた','焦げて黒かった','小さすぎた'], t:'B', n:'At first, Ken\'s cookies were too hard. が根拠。'},
{p:'p1', q:'アヤがケンにしたアドバイスは何ですか。', a:'次は小麦粉を少なくする', w:['次は砂糖を増やす','次はオーブンの温度を上げる','次は焼く時間を長くする'], t:'S', n:'Use less flour next time. = 小麦粉を少なく使う。'},
{p:'p1', q:'ケンとアヤは学園祭のためにどのくらい練習しましたか。', a:'放課後に2週間', w:['放課後に2日間','毎朝1か月','放課後に1週間'], t:'B', n:'They practiced after school for two weeks.'},
// p2
{p:'p2', q:'ユキがエミリーに持ってくるよう頼んだものは何ですか。', a:'暖かい上着', w:['お寿司の材料','電車の切符','京都のガイドブック'], t:'A', n:'Please bring a warm jacket と書かれている。'},
{p:'p2', q:'ユキの町から京都までの行き方と時間はどれですか。', a:'電車で約2時間', w:['電車で約1時間','バスで約2時間','飛行機で約2時間'], t:'S', n:'It takes about two hours from my town by train.'},
{p:'p2', q:'エミリーが着いた最初の夜、夕食を作るのは誰ですか。', a:'ユキのお母さん', w:['ユキ','エミリー','ユキのお父さん'], t:'B', n:'My mother will make dinner for you on the first night.'},
{p:'p2', q:'この手紙から、エミリーの来日について正しいものはどれですか。', a:'来月日本に来る予定だ', w:['先週日本に着いた','来年日本に来る予定だ','日本には来ないことになった'], t:'A', n:'you are coming to Japan next month とある。'},
// p3
{p:'p3', q:'ヒロシがよく試合中に悲しくなった理由は何ですか。', a:'背が高くなかったから', w:['走るのが遅かったから','コーチに叱られたから','チームに入れなかったから'], t:'A', n:'He is not tall, so he often felt sad in games.'},
{p:'p3', q:'コーチはヒロシの強みは何だと言いましたか。', a:'速いこと', w:['背が高いこと','シュートが正確なこと','声が大きいこと'], t:'S', n:'You are fast. That is your strength.'},
{p:'p3', q:'3か月後、ヒロシはどうなりましたか。', a:'すばやくパスを出すことがチームで一番になった', w:['身長が10センチ伸びた','キャプテンになった','別のチームに移った'], t:'B', n:'he became the best in his team at passing the ball quickly.'},
{p:'p3', q:'コーチの最後の言葉 "you changed your way of playing" の内容として適切なものはどれですか。', a:'体格ではなくプレーの仕方を変えて成長した', w:['体格が大きくなって上手になった','練習をやめて上手になった','ポジションが変わって上手になった'], t:'A', n:'You didn\'t change your size, but ... = 体は変えず、プレーの仕方を変えた。'},
// p4
{p:'p4', q:'プラスチックの袋が海にとって問題なのはなぜですか。', a:'海の生き物が間違えて食べて病気になるから', w:['海水の温度が上がるから','魚が船に近づけなくなるから','海が甘くなってしまうから'], t:'S', n:'Some sea animals eat them by mistake and get sick.'},
{p:'p4', q:'2020年に日本の店で始まったことは何ですか。', a:'レジ袋を有料にしたこと', w:['レジ袋の使用を全面的に禁止したこと','エコバッグを無料で配ったこと','ストローの販売をやめたこと'], t:'A', n:'shops began to charge money for plastic bags in 2020.'},
{p:'p4', q:'本文の "eco-bags" とは何ですか。', a:'買い物に自分で持っていく袋', w:['海で拾った袋','店が無料で渡す袋','紙でできた使い捨ての袋'], t:'B', n:'bring their own bags, called "eco-bags."'},
{p:'p4', q:'筆者の主張として適切なものはどれですか。', a:'ストローやボトルなどプラスチック製品をもっと減らすべきだ', w:['今の状態で十分なので何もしなくてよい','袋以外のプラスチックは使ってもよい','エコバッグを持っていれば、ほかの対策は必要ない'], t:'A', n:'Still, it is not enough. のあと、他のプラスチック製品も減らそうと述べている。'},
{p:'p4', q:'本文の "by mistake" の意味に最も近いものはどれですか。', a:'まちがって', w:['わざと','ゆっくり','すぐに'], t:'B', n:'by mistake = まちがえて。'},
// p5
{p:'p5', q:'農場で筆者がしたことは何ですか。', a:'しぼりたての牛乳を2杯飲んだ', w:['牛に乗った','チーズを作った','牛乳が苦手で飲まなかった'], t:'B', n:'I drank fresh milk ... I drank two glasses.'},
{p:'p5', q:'2日目に湖へ行けなかった理由は何ですか。', a:'雨が降ったから', w:['湖が遠すぎたから','弟が病気になったから','博物館が閉まっていたから'], t:'S', n:'On the second day, it rained, so we couldn\'t go to the lake.'},
{p:'p5', q:'弟が楽しんだのはいつのどんなことですか。', a:'最終日に市場で海鮮を食べたこと', w:['2日目に博物館で歴史を学んだこと','初日に農場で牛を見たこと','飛行機に乗ったこと'], t:'A', n:'he enjoyed the last day, when we ate seafood at a market.'},
{p:'p5', q:'筆者はこれからどうしたいと言っていますか。', a:'冬にまた北海道を訪れたい', w:['来年の夏にまた訪れたい','冬に沖縄を訪れたい','湖だけをもう一度見に行きたい'], t:'A', n:'I want to visit again in winter.'},
// p6
{p:'p6', q:'私たちが月を見ることができるのはなぜですか。', a:'月が太陽の光を反射するから', w:['月が自分で強い光を出すから','月が地球の光を集めるから','月が星の光を吸い取るから'], t:'S', n:'it reflects light from the sun.'},
{p:'p6', q:'月の形が日によって違って見えるのはなぜですか。', a:'月が地球の周りを回り、明るい面の見える部分が変わるから', w:['月が自分で大きさを変えるから','太陽が月の周りを回るから','月が毎日少しずつ溶けるから'], t:'S', n:'the moon moves around the earth, and we see different parts of its bright side.'},
{p:'p6', q:'月が地球の周りを1周するのにかかる時間はどれですか。', a:'約1か月', w:['約1日','約1週間','約1年'], t:'A', n:'It takes about one month ...'},
{p:'p6', q:'"new moon"（新月）とはどんなときですか。', a:'明るい面がまったく見えないとき', w:['明るい面全体が見えるとき','明るい面の半分が見えるとき','月が地球の影に入るとき'], t:'A', n:'When we cannot see the bright side at all, we call it a new moon.'},
// p7
{p:'p7', q:'nengajo とは何ですか。', a:'新年に友人や家族に送るカード', w:['誕生日に送るカード','夏に送るあいさつ状','お正月に食べる料理'], t:'B', n:'New Year\'s cards, called nengajo.'},
{p:'p7', q:'12月のある日までに年賀状を送るとどうなりますか。', a:'1月1日に届く', w:['12月中に届く','1月中旬に届く','送った人に戻ってくる'], t:'A', n:'the cards arrive on January 1st.'},
{p:'p7', q:'今の若い人について、本文の内容と合うものはどれですか。', a:'携帯でメッセージを送ることが多いが、紙のカードが好きな人もいる', w:['携帯を使わず紙のカードだけを送る','新年のあいさつを誰にもしない','紙のカードはもう誰も好まない'], t:'A', n:'often send messages by phone instead, but some of them still like paper cards.'},
{p:'p7', q:'少女の気持ちとして適切なものはどれですか。', a:'手書きは少し大変だが、もらうと温かい気持ちになる', w:['手書きは簡単なのでとても好きだ','カードをもらってもうれしくない','携帯のメッセージの方が温かく感じる'], t:'S', n:'It is a little hard to write by hand, but when I get a card, I feel warm.'},
// p8
{p:'p8', q:'筆者が祖母と朝にすることは何ですか。', a:'トマトときゅうりを摘む', w:['スイカを収穫する','庭に花を植える','畑を耕す'], t:'B', n:'we pick tomatoes and cucumbers together in the morning.'},
{p:'p8', q:'筆者が最初は祖母の家を好きでなかった理由は何ですか。', a:'近くにコンビニがなく、携帯もよく使えなかったから', w:['祖母がとても厳しかったから','野菜が嫌いだったから','庭が狭かったから'], t:'A', n:'no convenience store ... can\'t use my phone well there. At first I didn\'t like it.'},
{p:'p8', q:'祖母の言葉 "Vegetables taste better when you pick them yourself." の意味はどれですか。', a:'自分で摘んだ野菜はよりおいしい', w:['野菜は買った方がおいしい','野菜は夜に食べるとおいしい','野菜は大きいほどおいしい'], t:'S', n:'pick them yourself = 自分で摘む。'},
{p:'p8', q:'今年の夏、筆者は何をする予定ですか。', a:'祖母が道具をしまう小屋を作るのを手伝う', w:['祖母と一か月間暮らす','祖母の家を建て替える','祖母に携帯の使い方を教える'], t:'B', n:'I will help her build a small shed for her tools.'},
// p9
{p:'p9', q:'10代に必要な睡眠時間はどれくらいですか。', a:'毎晩8〜10時間', w:['毎晩5〜6時間','毎晩7時間未満','毎晩12時間以上'], t:'S', n:'teenagers need about eight to ten hours of sleep every night.'},
{p:'p9', q:'多くの生徒の睡眠が足りない原因として本文に挙げられているものはどれですか。', a:'夜遅くまでスマートフォンを使ったり勉強したりすること', w:['朝早くから部活動をすること','夜に運動しすぎること','昼寝を長くしすぎること'], t:'A', n:'they use smartphones late at night or study until midnight.'},
{p:'p9', q:'睡眠不足の影響として本文に書かれているものはどれですか。', a:'物事を覚えにくくなり、落ち着いていにくくなる', w:['背が伸びにくくなる','目が悪くなる','食欲がなくなる'], t:'A', n:'Lack of sleep makes it hard to remember things and to stay calm.'},
{p:'p9', q:'専門家のすすめとして正しいものはどれですか。', a:'寝る1時間前に携帯を使うのをやめる', w:['寝る直前に携帯で音楽を聞く','寝る前に必ず勉強する','夕方に長く昼寝をする'], t:'B', n:'we should stop using phones an hour before going to bed.'},
// p10
{p:'p10', q:'マイが3日間サラに話しかけなかった理由は何ですか。', a:'サラたちが自分の話をしていると思ったから', w:['サラが約束を破ったから','サラが引っ越してしまったから','サラに宿題を頼まれたから'], t:'S', n:'Mai thought they were talking about her.'},
{p:'p10', q:'サラが他の女の子たちと話していた本当の理由は何ですか。', a:'マイのための誕生日のサプライズを計画していたから', w:['マイを仲間はずれにしようとしていたから','宿題について相談していたから','旅行の計画を立てていたから'], t:'A', n:'I am planning a surprise birthday party for you.'},
{p:'p10', q:'マイが最後に言った "I should have asked you first." はどういう意味ですか。', a:'先にサラに聞くべきだった', w:['先にサラに謝ってもらうべきだった','先に先生に聞くべきだった','先にパーティーを開くべきだった'], t:'S', n:'should have +過去分詞 = ～すべきだったのに。'},
// p11
{p:'p11', q:'病院でロボットが運ぶものは何ですか。', a:'薬', w:['食事','患者','書類'], t:'B', n:'In hospitals, they carry medicine.'},
{p:'p11', q:'病院でロボットが使われると、看護師にとってどんな良いことがありますか。', a:'患者と話す時間が増える', w:['夜は休めるようになる','運動する時間が増える','薬を作らなくてよくなる'], t:'A', n:'nurses have more time to talk with patients.'},
{p:'p11', q:'ロボットができないこととして本文に書かれているのはどれですか。', a:'人間ほど人の気持ちを理解すること', w:['料理を運ぶこと','お年寄りと話すこと','薬を運ぶこと'], t:'S', n:'They cannot understand people\'s feelings as well as humans can.'},
{p:'p11', q:'ロボットについて、多くの人はどう考えていますか。', a:'人を助けるものであり、人の代わりではない', w:['人の代わりになるべきだ','人の手助けもすべきでない','お年寄りだけが使うべきだ'], t:'A', n:'robots should help us, not take our place.'},
// p12
{p:'p12', q:'学校の生徒はどれくらいの頻度で海岸掃除をしていますか。', a:'毎月第1日曜日', w:['毎週日曜日','毎月最終日曜日','毎年1回'], t:'B', n:'On the first Sunday of every month.'},
{p:'p12', q:'2時間の清掃で集まったごみの量はどれですか。', a:'20袋', w:['50袋','2袋','200袋'], t:'B', n:'we had collected twenty bags of trash.'},
{p:'p12', q:'近くに住む男性は生徒たちに何と言いましたか。', a:'お礼を言い、海岸がまた美しくなったと言った', w:['ごみを捨てないよう注意した','もっと早く来るよう頼んだ','古い靴をもらいたいと言った'], t:'A', n:'"Thank you. The beach is beautiful again."'},
{p:'p12', q:'筆者の気持ちと今後の予定として適切なものはどれですか。', a:'誇らしく感じ、来月も参加して家族も誘いたい', w:['疲れたので来月は参加しない','恥ずかしく感じ、二度と参加しない','誇らしく感じるが、一人で参加したい'], t:'S', n:'I felt proud ... join again next month ... ask my family to come.'},
// p13
{p:'p13', q:'トムにとって難しかった日本の食べ物は何ですか。', a:'納豆', w:['寿司','味噌汁','天ぷら'], t:'B', n:'natto was too difficult for him.'},
{p:'p13', q:'トムが公園で教えてくれたことは何ですか。', a:'クリケットのやり方', w:['サッカーのやり方','納豆の食べ方','英語の歌'], t:'A', n:'He also taught us how to play cricket at a park.'},
{p:'p13', q:'最終日にトムはどうしましたか。', a:'駅で泣き、また来ると言った', w:['駅で笑い、もう来ないと言った','家でそっと出発した','空港で家族に手紙を渡した'], t:'A', n:'Tom cried at the station and said, "I will come back."'},
{p:'p13', q:'筆者の家族とトムは今どうしていますか。', a:'毎週メッセージを送り合っている', w:['毎日電話で話している','1年に一度会っている','連絡を取っていない'], t:'S', n:'Now we send messages to each other every week.'},
// p14
{p:'p14', q:'この図書館の新サービスでは、本をどのように借りますか。', a:'アプリで本のバーコードを撮影する', w:['職員に必ず声をかける','電話で予約して取りに行く','パソコンで登録用紙を印刷する'], t:'S', n:'you take a picture of the barcode on the book.'},
{p:'p14', q:'図書館が期待していることは何ですか。', a:'もっと多くの若い人に利用してもらうこと', w:['お年寄りだけに利用してもらうこと','本の数を減らすこと','職員を増やすこと'], t:'A', n:'The library hopes that more young people will use the library.'},
{p:'p14', q:'本文の内容と合うものはどれですか。', a:'アプリでは一部の本を無料で読める', w:['アプリで読む本はすべて有料だ','本を借りるときは必ず職員の許可が必要だ','すでに3000人が利用している'], t:'B', n:'You can also read some books on the app for free.'},
{p:'p14', q:'この図書館のサービスが始まったのはいつですか。', a:'先月', w:['先週','3か月前','去年'], t:'B', n:'The service started last month.'}
]});
