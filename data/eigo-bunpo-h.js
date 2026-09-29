(function(){
  var P1 = '次の( )に入る最も適切なものを選べ。\n';
  var P2 = '次のうち、文法的に正しい文を選べ。';
  var items = [];
  var cnt = 0, pat = 'A';
  function sec(p){ pat = p; cnt = 0; }
  function tt(){ var t = pat.charAt(cnt % pat.length); cnt++; return t; }
  // 空所補充: B(英文, 正解, [誤答3], 解説, 訳)
  function B(s, a, w, n, y){
    items.push({q: P1 + s + (y ? '\n(訳:' + y + ')' : ''), a: a, w: w, t: tt(), n: n});
  }
  // 正しい文選択: C(ラベル, 正解文, [誤文3], 解説)
  function C(label, a, w, n){
    items.push({q: P2 + '\n【' + label + '】', a: a, w: w, t: tt(), n: n});
  }

  // ===== 時制 =====
  sec('SSAAASSABB');
  B(`By the time we arrived, the movie ( ) already started.`, `had`, [`has`, `have`, `would`], `過去のある時点(到着時)より前に始まっていたので過去完了 had started。`);
  B(`I ( ) in Osaka since 2015.`, `have lived`, [`lived`, `live`, `will live`], `since は継続を表す現在完了とともに用い、have lived となる。`);
  B(`When I called her, she ( ) dinner.`, `was cooking`, [`cooks`, `has cooked`, `will cook`], `過去のある時点で進行中の動作は過去進行形 was cooking。`);
  B(`I will call you as soon as he ( ) home.`, `gets`, [`will get`, `got`, `getting`], `時を表す副詞節では未来のことも現在形で表す。`);
  B(`If it ( ) tomorrow, we will cancel the picnic.`, `rains`, [`will rain`, `rained`, `is rained`], `条件を表す副詞節では未来のことも現在形で表す。`);
  B(`He told me that he ( ) the book before.`, `had read`, [`reads`, `will read`, `has read`], `told(過去)より前の経験なので、時制の一致により過去完了 had read。`);
  B(`I have been waiting for you ( ) two hours.`, `for`, [`since`, `during`, `from`], `期間の長さ(two hours)には for、起点には since を使う。`);
  B(`It ( ) three years since my father died.`, `has been`, [`will be`, `would be`, `being`], `It has been ~ since ... は「...して以来~になる」の現在完了の定型表現。`);
  B(`Water ( ) at 100 degrees Celsius.`, `boils`, [`boiled`, `is boiled`, `has boiled`], `一般的な事実・真理は現在形で表す。`);
  B(`The train ( ) at 7:30 tomorrow.`, `leaves`, [`left`, `has left`, `leaving`], `確定した時刻表の予定は、未来でも現在形で表せる。`);
  B(`I ( ) him since last year.`, `haven't seen`, [`didn't see`, `don't see`, `wasn't seeing`], `since last year と結びつくのは現在完了(継続)。`, `昨年から彼に会っていない`);
  B(`By next March, he ( ) here for ten years.`, `will have worked`, [`works`, `has worked`, `worked`], `未来のある時点までの継続は未来完了 will have p.p.。`);
  B(`She ( ) TV when the phone rang.`, `was watching`, [`watches`, `has watched`, `is watching`], `電話が鳴った過去の時点で進行中の動作なので過去進行形。`);
  B(`When I was a child, I ( ) to the sea every summer.`, `used to go`, [`use to go`, `was used to go`, `am used to going`], `過去の習慣は used to do。use to や was used to do は誤り。`);
  B(`I have never ( ) such a beautiful view.`, `seen`, [`saw`, `see`, `seeing`], `have never の後ろは過去分詞 seen(現在完了の経験)。`);
  B(`He has been ( ) the piano for three hours.`, `playing`, [`played`, `play`, `to play`], `現在完了進行形は have been ~ing。`);
  B(`She has ( ) to Paris twice.`, `been`, [`gone`, `went`, `going`], `「行ったことがある」は have been to。have gone to は「行ってしまった」で経験には使えない。`);
  B(`I was tired because I ( ) all night.`, `had been working`, [`have been working`, `am working`, `was worked`], `過去の時点まで続いていた動作は過去完了進行形 had been ~ing。`);
  C(`現在完了`, `I have finished my homework already.`, [`I have finished my homework yesterday.`, `I finished my homework since two hours.`, `I have finished my homework two hours ago.`], `現在完了は yesterday や ago などの明確な過去を表す語と使えない。`);
  B(`Let's wait until the rain ( ).`, `stops`, [`will stop`, `is stopped`, `stopping`], `until は時の副詞節を導くので未来のことも現在形。`);
  B(`Once you ( ) the button, the machine will start.`, `press`, [`will press`, `to press`, `have been pressing`], `once(いったん~すれば)は条件・時の副詞節で、現在形を使う。`);
  B(`The sun ( ) in the east and sets in the west.`, `rises`, [`rose`, `is risen`, `has rose`], `不変の事実・自然現象は現在形。rise は自動詞なので受動態にしない。`);

  // ===== 助動詞 =====
  sec('SAAABBSAAB');
  B(`He ( ) have stayed up late last night.`, `must`, [`cannot`, `need`, `shall`], `must have p.p. は過去の事実への強い推量(~したに違いない)。`, `彼は昨夜遅くまで起きていたに違いない`);
  B(`I ( ) harder when I was a student.`, `should have studied`, [`should study`, `must have studied`, `would studied`], `should have p.p. は過去にしなかったことへの後悔・非難(~すべきだったのに)。`, `学生の頃もっと勉強すべきだった`);
  B(`He ( ) be over sixty. He looks so young.`, `cannot`, [`must`, `may`, `should`], `cannot be ~ は「~のはずがない」という否定の強い推量。`, `彼が60歳を超えているはずがない。とても若く見える`);
  B(`You ( ) to hurry. We have plenty of time.`, `don't have`, [`must not`, `cannot`, `may not`], `don't have to do は「~する必要はない」。他は to の前に置けない。`);
  B(`Would you mind ( ) the window?`, `opening`, [`to open`, `open`, `opened`], `mind は動名詞を目的語にとる。`);
  B(`I would rather ( ) at home than go out.`, `stay`, [`to stay`, `staying`, `stayed`], `would rather の後ろは原形不定詞。`);
  B(`You had better ( ) a doctor.`, `see`, [`to see`, `seeing`, `seen`], `had better の後ろは原形不定詞。`);
  B(`He is used to ( ) up early.`, `getting`, [`get`, `to get`, `gets`], `be used to の to は前置詞なので動名詞が続く。`);
  B(`It is necessary that he ( ) at once.`, `go`, [`to go`, `going`, `gone`], `necessary などの必要を表す形容詞に続く that 節では、動詞は原形(仮定法現在)。`);
  B(`Let's go, ( )?`, `shall we`, [`will we`, `don't we`, `do we`], `Let's ~ の付加疑問は shall we? を使う。`);
  B(`Open the door, ( )?`, `will you`, [`shall we`, `don't you`, `did you`], `命令文の付加疑問は will you? が基本。`);
  B(`We ( ) have missed the last train; the station was already closed.`, `must`, [`cannot`, `need`, `shall`], `過去の事実への確信ある推量。must have p.p. は「~したに違いない」。`, `私たちは終電を逃したに違いない。駅はもう閉まっていた`);
  B(`I ( ) go there alone when I was a child.`, `would often`, [`can often`, `will often`, `must often`], `過去の習慣を表す would often do。will/can/must は過去の習慣に使えない。`, `子どもの頃、私はよくそこへ一人で行ったものだ`);
  B(`He ( ) have made such a mistake; he is very careful.`, `cannot`, [`must`, `should`, `need`], `cannot have p.p. は過去について「~したはずがない」。`, `彼がそんな間違いをしたはずがない。とても注意深い人だ`);

  // ===== 仮定法 =====
  sec('SSAASASABB');
  B(`If I ( ) rich, I would buy a yacht.`, `were`, [`am`, `will be`, `had been`], `現在の事実と反対の仮定は、if 節に過去形(be動詞は were)を使う。`);
  B(`If I had known, I ( ) helped you.`, `would have`, [`would`, `will have`, `had`], `過去の事実と反対の仮定は、主節に would have p.p.。`);
  B(`If she had left earlier, she ( ) the train.`, `would have caught`, [`would catch`, `will catch`, `had caught`], `仮定法過去完了: If S had p.p., S would have p.p.。`);
  B(`I wish I ( ) a car now.`, `had`, [`have`, `will have`, `had had`], `現在の実現しない願望は I wish + 過去形。`);
  B(`I wish I ( ) harder when I was young.`, `had studied`, [`studied`, `would study`, `study`], `過去についての後悔は I wish + 過去完了。`);
  B(`She behaves as if she ( ) the boss, but she is not.`, `were`, [`is`, `will be`, `has been`], `事実に反する as if 節は仮定法過去(were)。`);
  B(`If it ( ) for your help, I would have failed.`, `had not been`, [`has not been`, `is not`, `had been not`], `過去の事実に反する「~がなかったら」は If it had not been for ~。`);
  B(`( ) I a bird, I would fly to you.`, `Were`, [`Was`, `If`, `Am`], `If I were a bird の if を省略すると倒置して Were I ~ となる。`);
  B(`( ) I known the truth, I would have told you.`, `Had`, [`Have`, `If`, `Did`], `If I had known の if を省略し、Had I known と倒置する。`);
  B(`It is time you ( ) to bed.`, `went`, [`gone`, `going`, `will go`], `It is time + 過去形で「もう~してよい時間だ」(仮定法過去)。`);
  B(`If I ( ) you, I would accept the offer.`, `were`, [`am`, `would be`, `had been`], `現在の事実に反する仮定なので If I were you。`);
  B(`Without your help, I ( ) succeeded.`, `could not have`, [`cannot have`, `could not`, `will not have`], `Without ~ は過去の仮定を含み、主節は could not have p.p.。`, `あなたの助けがなければ成功できなかっただろう`);
  B(`I would have gone if I ( ) time.`, `had had`, [`have had`, `would have`, `had`], `過去の事実に反する仮定は if 節に過去完了 had had。`);
  B(`If I hadn't been so busy yesterday, I ( ) you.`, `would have visited`, [`will visit`, `would visit`, `had visited`], `if 節が過去完了なので主節は would have p.p.。`);
  B(`But for the rain, we ( ) a good time.`, `would have had`, [`will have`, `had had`, `would had`], `But for ~ (~がなければ)は if 節の代用。過去の話なので would have p.p.。`, `雨がなければ楽しく過ごせただろうに`);
  B(`If I ( ) more money, I would travel abroad more often.`, `had`, [`have`, `has`, `will have`], `現在の事実に反する仮定は if 節が過去形。`);
  B(`It is important that every student ( ) on time.`, `be`, [`being`, `to be`, `been`], `important など判断を表す形容詞に続く that 節は動詞が原形(be)。`);
  B(`The doctor recommended that he ( ) more vegetables.`, `eat`, [`eating`, `to eat`, `eaten`], `recommend/suggest/insist(要求)+ that 節は動詞が原形(または should+原形)。`);
  B(`She demanded that the manager ( ) at once.`, `apologize`, [`to apologize`, `apologizing`, `was apologize`], `demand の that 節は動詞が原形(または should+原形)。`);
  B(`He suggested that we ( ) the plan.`, `change`, [`to change`, `changing`, `changes`], `suggest の that 節は動詞が原形(または should+原形)。`);
  C(`仮定法`, `If I were you, I would apologize.`, [`If I was you, I will apologize.`, `If I am you, I would apologize.`, `If I were you, I will apologize.`], `現在の事実に反する仮定は If S were ~, S would ...。`);
  C(`I wish`, `I wish I had more time.`, [`I wish I have more time.`, `I wish I will have more time.`, `I wish I would had more time.`], `I wish の後ろは仮定法(現在の願望なら過去形 had)。`);
  C(`if の省略`, `Had I known the truth, I would have told you.`, [`Had I know the truth, I would have told you.`, `If I would have known the truth, I would have told you.`, `Did I know the truth, I would have told you.`], `仮定法過去完了の if 省略は Had S p.p. の倒置。if 節に would は入らない。`);

  // ===== 受動態 =====
  sec('SASAABSABS');
  B(`The bridge ( ) in 1990.`, `was built`, [`built`, `has built`, `is built`], `橋は「建てられる」側なので受動態。in 1990 は過去なので was built。`);
  B(`English ( ) all over the world.`, `is spoken`, [`speaks`, `is speaking`, `has spoke`], `英語は「話される」ので現在形の受動態 is spoken。`);
  B(`The room ( ) every day.`, `is cleaned`, [`cleans`, `is cleaning`, `has cleaned`], `部屋は「掃除される」側で、習慣なので現在形の受動態。`);
  B(`The baby was taken care ( ) by her aunt.`, `of`, [`for`, `at`, `on`], `群動詞 take care of の受動態は、of を残して was taken care of by ~。`);
  B(`He was laughed ( ) by everyone.`, `at`, [`to`, `of`, `with`], `laugh at の受動態は、at を残す。`);
  B(`The boy was made ( ) the room.`, `to clean`, [`clean`, `cleaning`, `cleaned`], `make O do の受動態では、原形が to 不定詞に変わる。`);
  B(`The letter ( ) by tomorrow.`, `will be sent`, [`will send`, `sends`, `has sending`], `手紙は「送られる」側。未来の受動態は will be p.p.。`);
  B(`I am interested ( ) music.`, `in`, [`at`, `on`, `with`], `be interested in ~ で「~に興味がある」。`);
  B(`I had my bag ( ) on the train.`, `stolen`, [`steal`, `stealing`, `to steal`], `have O p.p. は「O を~される」(被害)を表す。`);
  B(`The road is now ( ) repaired.`, `being`, [`been`, `be`, `to be`], `進行形の受動態は be being p.p.。`);
  B(`They made him wait. → He was made ( ).`, `to wait`, [`wait`, `waiting`, `waited`], `使役動詞 make の受動態では、原形が to 不定詞になる。`);
  B(`The problem is being ( ) by the committee now.`, `discussed`, [`discuss`, `discussing`, `to discuss`], `is being の後ろは過去分詞(進行形の受動態)。`);
  C(`受動態`, `A new library will be built next year.`, [`A new library will build next year.`, `A new library will be building next year.`, `A new library will be build next year.`], `図書館は「建てられる」ので will be + 過去分詞。`);
  C(`知覚動詞`, `He was seen to enter the room.`, [`He was seen enter the room.`, `He saw to enter the room.`, `He was seen entering to the room.`], `see O do の受動態は、原形が to 不定詞に変わる(was seen to do)。`);

  // ===== 不定詞・動名詞 =====
  sec('SASABSABBASA');
  B(`I enjoyed ( ) with him.`, `talking`, [`to talk`, `talk`, `talked`], `enjoy は動名詞のみを目的語にとる。`);
  B(`She decided ( ) abroad.`, `to study`, [`studying`, `study`, `studied`], `decide は不定詞を目的語にとる。`);
  B(`Remember ( ) the door when you leave.`, `to lock`, [`locking`, `lock`, `locked`], `remember to do は「(これから)~することを忘れない」。`);
  B(`I remember ( ) him at the party last year.`, `seeing`, [`to see`, `see`, `saw`], `remember doing は「~したことを覚えている」。`);
  B(`I forgot ( ) the letter, so it is still in my bag.`, `to mail`, [`mailing`, `mail`, `mailed`], `forget to do は「~し忘れる」。手紙が手元にあるので投函し忘れた。`);
  B(`He stopped ( ) because it was bad for his health.`, `smoking`, [`to smoke`, `smoke`, `smoked`], `stop doing は「~をやめる」。stop to do は「~するために立ち止まる」。`);
  B(`I'm looking forward to ( ) you.`, `seeing`, [`see`, `saw`, `to see`], `look forward to の to は前置詞なので動名詞が続く。`);
  B(`She is good at ( ) pictures.`, `drawing`, [`draw`, `to draw`, `drawn`], `前置詞 at の後ろは動名詞。`);
  B(`It is no use ( ) over spilt milk.`, `crying`, [`to cry`, `cry`, `cried`], `It is no use doing は「~しても無駄だ」。`);
  B(`I can't help ( ) when I see it.`, `laughing`, [`to laugh`, `laugh`, `laughed`], `cannot help doing は「~せずにはいられない」。`);
  B(`He refused ( ) my offer.`, `to accept`, [`accepting`, `accept`, `accepted`], `refuse は不定詞を目的語にとる。`);
  B(`She suggested ( ) a taxi.`, `taking`, [`to take`, `take`, `took`], `suggest は動名詞を目的語にとる(不定詞は不可)。`);
  B(`Do you mind my ( ) the window?`, `opening`, [`to open`, `open`, `opened`], `mind の目的語は動名詞。my は動名詞の意味上の主語。`);
  B(`I want you ( ) me.`, `to help`, [`help`, `helping`, `helped`], `want O to do の形をとる。`);
  B(`The book is worth ( ).`, `reading`, [`to read`, `read`, `to be read`], `be worth doing は「~する価値がある」。`);
  B(`I have a lot of work ( ).`, `to do`, [`doing`, `do`, `done`], `不定詞の形容詞的用法で work を修飾する。`);
  B(`He is old enough ( ) a car.`, `to drive`, [`driving`, `drive`, `drives`], `形容詞 enough to do で「~するのに十分」。`);
  B(`He seems ( ) sick yesterday.`, `to have been`, [`to be`, `being`, `been`], `seem の時点より前のことは完了不定詞 to have p.p.。`, `彼は昨日、病気だったようだ`);
  B(`I don't know what ( ) next.`, `to do`, [`doing`, `do`, `done`], `疑問詞 + to do の形で名詞句を作る。`);
  B(`There is no ( ) what will happen.`, `telling`, [`tell`, `to tell`, `told`], `There is no doing は「~することはできない」。`);
  B(`Would you like ( ) some tea?`, `to have`, [`having`, `have`, `had`], `would like は to 不定詞をとる。`);
  B(`I look forward to ( ) from you.`, `hearing`, [`hear`, `heard`, `to hear`], `look forward to の to は前置詞。動名詞が続く。`);
  B(`She insisted on ( ) the bill.`, `paying`, [`to pay`, `pay`, `paid`], `前置詞 on の後ろは動名詞。`);
  B(`He is busy ( ) for the exam.`, `preparing`, [`to prepare`, `prepare`, `prepared`], `be busy doing は「~するのに忙しい」。`);
  B(`I spent two hours ( ) the report.`, `writing`, [`to write`, `write`, `written`], `spend 時間 doing で「~して時間を過ごす」。`);
  B(`He kept ( ) me questions.`, `asking`, [`to ask`, `ask`, `asked`], `keep doing は「~し続ける」。`);
  B(`It takes me ten minutes ( ) to school.`, `to walk`, [`walks`, `walk`, `walked`], `It takes 人 時間 to do の形。`);
  B(`I was too tired ( ) any more.`, `to walk`, [`walking`, `walk`, `walked`], `too ~ to do で「あまりに~で...できない」。`);
  B(`He avoided ( ) the question.`, `answering`, [`to answer`, `answer`, `answered`], `avoid は動名詞のみを目的語にとる。`);
  C(`動名詞`, `I am looking forward to seeing you.`, [`I am looking forward to see you.`, `I look forward seeing you.`, `I am looking forward for seeing you.`], `look forward to の to は前置詞なので seeing。`);
  C(`used to`, `She is used to getting up early.`, [`She is used to get up early.`, `She used to getting up early.`, `She is use to getting up early.`], `be used to doing(~に慣れている)。to は前置詞。`);
  C(`would rather`, `I'd rather stay home than go out.`, [`I'd rather to stay home than go out.`, `I'd rather staying home than going out.`, `I'd rather stay home than to going out.`], `would rather A than B の A, B は原形。`);
  C(`spend`, `She spent an hour reading the book.`, [`She spent an hour to read the book.`, `She spent an hour reads the book.`, `She spent reading an hour the book.`], `spend 時間 (in) doing の形。to 不定詞は使えない。`);
  C(`形式主語`, `It is impossible for him to finish it in a day.`, [`It is impossible of him to finish it in a day.`, `He is impossible to finish it in a day.`, `It is impossible him to finish it in a day.`], `impossible は人の性質でなく to 不定詞に for + 人を使う。`);
  C(`of + 人`, `It is kind of you to help me.`, [`It is kind for you to help me.`, `It is kind that you to help me.`, `You are kind to helping me.`], `人の性質を表す形容詞(kind など)は of + 人を使う。`);

  // ===== 分詞・分詞構文 =====
  sec('SASABSAB');
  B(`The boy ( ) under the tree is my brother.`, `sitting`, [`sat`, `sit`, `to sit`], `「~している」を表す現在分詞が後ろから名詞を修飾する。`);
  B(`The car ( ) in Germany is very expensive.`, `made`, [`making`, `make`, `makes`], `car は「作られる」側なので過去分詞 made が後ろから修飾する。`);
  B(`I heard my name ( ) in the crowd.`, `called`, [`call`, `calling`, `to call`], `知覚動詞 hear O p.p. で「O が~されるのが聞こえる」。`);
  B(`( ) from the hill, the town looks beautiful.`, `Seen`, [`Seeing`, `See`, `To see`], `町は「見られる」側なので受動の分詞構文(過去分詞)。`);
  B(`( ) a lot of homework, I couldn't go out.`, `Having`, [`Have`, `To have`, `Being had`], `理由を表す分詞構文。「宿題がたくさんあったので」。`);
  B(`( ) no bus, we had to walk.`, `There being`, [`It being`, `We being`, `There is`], `there is 構文の分詞構文は、意味上の主語を残した There being。`);
  B(`Weather ( ), we will go on a picnic.`, `permitting`, [`permitted`, `permit`, `to permit`], `Weather permitting(天気がよければ)は独立分詞構文。`);
  B(`He sat there with his arms ( ).`, `folded`, [`folding`, `fold`, `to fold`], `with O p.p. で「O を~された状態で」。腕は「組まれる」側。`);
  B(`The news was very ( ).`, `surprising`, [`surprised`, `surprise`, `surprises`], `ニュースが人を驚かせる側なので現在分詞 surprising。`);
  B(`I was ( ) to hear the news.`, `surprised`, [`surprising`, `surprise`, `surprises`], `人が驚かされる側なので過去分詞 surprised。`);
  B(`The movie was so ( ) that I fell asleep.`, `boring`, [`bored`, `bore`, `to bore`], `映画が人を退屈させる側なので boring。`);
  B(`Generally ( ), Japanese people are polite.`, `speaking`, [`spoken`, `spoke`, `speak`], `Generally speaking(一般的に言えば)は慣用的な分詞構文。`);
  B(`Judging ( ) his accent, he is from the south.`, `from`, [`at`, `to`, `on`], `Judging from ~ で「~から判断すると」。`);
  B(`Not ( ) what to do, she asked for help.`, `knowing`, [`known`, `know`, `to know`], `否定の分詞構文は not を分詞の前に置く。`);
  B(`I had my hair ( ) yesterday.`, `cut`, [`cutting`, `cuts`, `to cut`], `have O p.p. で「O を~してもらう」。`);
  C(`分詞の後置修飾`, `The man walking along the river is my uncle.`, [`The man walked along the river is my uncle.`, `The man walks along the river is my uncle.`, `The man to walking along the river is my uncle.`], `現在分詞 walking が後ろから man を修飾する。`);

  // ===== 関係詞 =====
  sec('SASABSAABB');
  B(`The man ( ) lives next door is a doctor.`, `who`, [`whom`, `which`, `whose`], `先行詞が人で、後ろに動詞が続くので主格 who。`);
  B(`The book ( ) I bought yesterday is interesting.`, `which`, [`who`, `what`, `whose`], `先行詞が物で、bought の目的語なので目的格 which(that も可)。`);
  B(`The girl ( ) mother is a nurse is my friend.`, `whose`, [`who`, `whom`, `which`], `後ろに無冠詞の名詞(mother)が続くので所有格 whose。`);
  B(`This is the house ( ) I was born.`, `where`, [`which`, `what`, `whom`], `I was born は完全な文なので関係副詞 where。`);
  B(`I know the reason ( ) he was absent.`, `why`, [`how`, `when`, `what`], `reason を先行詞とする関係副詞は why。`);
  B(`This is the house in ( ) he lives.`, `which`, [`that`, `where`, `what`], `前置詞 + 関係代名詞では that は使えず which となる。`);
  B(`The woman to ( ) I spoke was very kind.`, `whom`, [`who`, `which`, `whose`], `前置詞 to の直後の人称の関係代名詞は whom。`);
  B(`He said nothing, ( ) made her angry.`, `which`, [`what`, `that`, `it`], `前の内容全体を先行詞とする非制限用法は which。`);
  B(`( ) surprised me was his silence.`, `What`, [`That`, `Which`, `It`], `関係代名詞 what は「~するもの・こと」で、名詞節を作る。`);
  B(`This is ( ) I have wanted.`, `what`, [`that`, `which`, `whom`], `先行詞を含む関係代名詞 what(私が欲しかったもの)。`);
  B(`All ( ) glitters is not gold.`, `that`, [`what`, `which`, `who`], `all が先行詞のときは関係代名詞 that を使う。`);
  B(`This is the best film ( ) I have ever seen.`, `that`, [`what`, `who`, `whose`], `最上級が先行詞のときは that が好まれる。`);
  B(`The only thing ( ) I remember is his name.`, `that`, [`what`, `who`, `whom`], `the only が付く先行詞には関係代名詞 that を使う。`);
  B(`He has two sons, ( ) are doctors.`, `both of whom`, [`both of them`, `they both`, `both who`], `非制限用法で「その二人とも」は both of whom。both of them だけでは文がつながらない。`);
  B(`The book, ( ) I bought yesterday, is very good.`, `which`, [`that`, `what`, `who`], `コンマの後の非制限用法では that は使えない。`);
  B(`Mr. Ito, ( ) I met yesterday, is a lawyer.`, `whom`, [`that`, `what`, `which`], `人を先行詞とする非制限用法の目的格は whom(that は不可)。`);
  B(`( ) comes first will be served first.`, `Whoever`, [`Whom`, `Whomever`, `Anyone`], `複合関係代名詞 whoever が主語になる(~する人は誰でも)。`);
  B(`I'll give this to ( ) wants it.`, `whoever`, [`whomever`, `whom`, `that`], `前置詞 to の目的語は wants の主語を含む節全体なので whoever。`);
  B(`He is not ( ) he used to be.`, `what`, [`that`, `which`, `who`], `what he used to be で「昔の彼」。`);
  B(`The town ( ) I stayed was small.`, `where`, [`which`, `that`, `what`], `I stayed は完全な文なので関係副詞 where。`);
  B(`Everything ( ) he said was true.`, `that`, [`what`, `who`, `whom`], `everything などの不定代名詞には that を使う。`);
  B(`The people ( ) I work with are kind.`, `whom`, [`whose`, `which`, `what`], `work with の目的語なので whom(who も口語で可)。`);
  C(`関係代名詞の重複`, `The book which I bought yesterday is interesting.`, [`The book which I bought it yesterday is interesting.`, `The book what I bought yesterday is interesting.`, `The book who I bought yesterday is interesting.`], `関係代名詞が目的語を兼ねるので、it を重ねてはいけない。`);
  C(`whose`, `I met a girl whose bag was stolen.`, [`I met a girl who her bag was stolen.`, `I met a girl that her bag was stolen.`, `I met a girl whom bag was stolen.`], `「その人の~」は所有格 whose + 名詞。who/that の後ろに her を重ねない。`);
  C(`非制限用法`, `The teacher, whom everyone respects, is retiring.`, [`The teacher, that everyone respects, is retiring.`, `The teacher, who everyone respect, is retiring.`, `The teacher, whom everyone respects him, is retiring.`], `コンマ付きの非制限用法では that は使えず、目的格は whom。`);

  // ===== 比較 =====
  sec('SASASBABSAB');
  B(`He is taller than ( ) other boy in the class.`, `any`, [`all`, `many`, `most`], `比較級 than any other + 単数名詞で最上級と同じ意味。`);
  B(`Nothing is ( ) important than health.`, `more`, [`most`, `so`, `very`], `Nothing is more ~ than ... で「...ほど~なものはない」。`);
  B(`The more you study, ( ) you learn.`, `the more`, [`more`, `most`, `the most`], `the + 比較級, the + 比較級 で「~すればするほど...」。`);
  B(`This is ( ) of the two.`, `the better`, [`better`, `the best`, `best`], `二者の比較では the + 比較級を使う。`);
  B(`He has ( ) 100 yen. He cannot even buy a bottle of juice.`, `no more than`, [`no less than`, `not less than`, `no fewer than`], `no more than は「たった~しかない」。`, `彼はたった100円しか持っていない`);
  B(`He has ( ) one million yen in his bank account.`, `no less than`, [`no more than`, `not more than`, `only`], `no less than は「~も(多く)ある」。`, `彼は銀行口座に100万円も持っている`);
  B(`This tower is twice as ( ) as that one.`, `tall`, [`taller`, `tallest`, `height`], `倍数 + as + 原級 + as の形。`);
  B(`Their house is three times the ( ) of ours.`, `size`, [`large`, `big`, `wide`], `倍数 + the + 名詞 + of の形(the size of)。`);
  B(`I prefer coffee ( ) tea.`, `to`, [`than`, `from`, `of`], `prefer A to B の形。than は使わない。`);
  B(`This car is superior ( ) that one.`, `to`, [`than`, `of`, `over`], `superior, inferior, senior, junior などはラテン比較級で than でなく to をとる。`);
  B(`Tom is the tallest ( ) his class.`, `in`, [`of`, `at`, `between`], `最上級の範囲を表す単数の集団・場所には in を使う。`);
  B(`Japan is not as large ( ) Canada.`, `as`, [`than`, `like`, `to`], `not as ~ as ... の形。`);
  B(`The population of China is larger than ( ) of India.`, `that`, [`this`, `it`, `those`], `the population の繰り返しを避けて that を使う。`);
  B(`The better I know him, the ( ) I like him.`, `more`, [`most`, `much`, `better`], `the 比較級, the 比較級 の構文。like の程度を表す more。`);
  B(`This book is ( ) more interesting than that one.`, `much`, [`very`, `so`, `too`], `比較級の強調には much, far, even, still などを使う。very は使えない。`);
  B(`He is the ( ) of the two brothers.`, `taller`, [`tall`, `tallest`, `more tall`], `二者の比較なので the + 比較級。`);
  B(`It is getting colder and ( ).`, `colder`, [`cold`, `coldest`, `more cold`], `比較級 and 比較級 で「ますます~」。`);

  // ===== 接続詞・前置詞 =====
  sec('ASBASBABSA');
  B(`( ) it was raining, we went out.`, `Although`, [`Because`, `So`, `Unless`], `雨だったが出かけた、と逆接なので although。`, `雨が降っていたが、私たちは出かけた`);
  B(`I stayed home ( ) I was sick.`, `because`, [`though`, `unless`, `until`], `理由を表す because。`, `私は病気だったので家にいた`);
  B(`Hurry up, ( ) you will miss the train.`, `or`, [`and`, `but`, `so`], `命令文, or ~ で「~しなさい、さもないと...」。`);
  B(`Study hard, ( ) you will pass the exam.`, `and`, [`or`, `but`, `yet`], `命令文, and ~ で「~しなさい、そうすれば...」。`);
  B(`( ) you study harder, you won't pass.`, `Unless`, [`If`, `Because`, `Though`], `unless は「~しない限り」。not を含めず、if not と同じ意味。`, `もっと勉強しない限り、合格しないだろう`);
  B(`He studied hard so ( ) he might pass the exam.`, `that`, [`as`, `for`, `to`], `so that S may ~ で「~するために」。`);
  B(`It was ( ) a cold day that we stayed home.`, `such`, [`so`, `very`, `too`], `such a + 形容詞 + 名詞 + that ~ の形。`);
  B(`He was ( ) tired that he fell asleep.`, `so`, [`such`, `very`, `too`], `so + 形容詞 + that ~ の形。`);
  B(`Both Tom ( ) Mary were late.`, `and`, [`or`, `nor`, `as`], `both A and B の形。`);
  B(`Either you ( ) I have to go.`, `or`, [`nor`, `and`, `but`], `either A or B の形。`);
  B(`Neither he ( ) I was there.`, `nor`, [`or`, `and`, `but`], `neither A nor B の形。`);
  B(`I will go ( ) it rains.`, `even if`, [`unless`, `because`, `since`], `even if は「たとえ~でも」。`, `たとえ雨が降っても行く`);
  B(`The game was canceled ( ) the rain.`, `because of`, [`because`, `although`, `in spite`], `名詞(the rain)の前には前置詞句 because of。`);
  B(`( ) his poor health, he works hard.`, `Despite`, [`Although`, `Because of`, `Though`], `名詞句の前で逆接を表すのは despite(in spite of)。`, `健康状態が悪いにもかかわらず、彼は懸命に働く`);
  B(`( ) he was poor, he was happy.`, `Although`, [`Despite`, `In spite`, `Because of`], `後ろに主語・動詞が続くので接続詞 although。`);
  B(`I have lived here ( ) 2010.`, `since`, [`for`, `from`, `during`], `起点を表す since。現在完了とともに使う。`);
  B(`I must finish this ( ) five o'clock.`, `by`, [`until`, `since`, `for`], `期限を表すのは by、継続の終点は until。`);
  B(`He fell asleep ( ) the movie.`, `during`, [`while`, `since`, `between`], `名詞(the movie)が続くので前置詞 during。`);
  B(`( ) I was reading, the phone rang.`, `While`, [`During`, `For`, `Since`], `後ろに主語・動詞が続くので接続詞 while。`, `私が読書をしている間に、電話が鳴った`);
  B(`It is a long time ( ) I saw you last.`, `since`, [`when`, `after`, `for`], `It is ~ since S+過去形 で「~してから...になる」。`, `最後にあなたに会ってから長い時間がたつ`);
  B(`He will succeed ( ) he keeps trying.`, `as long as`, [`unless`, `although`, `whereas`], `as long as は「~する限り(条件)」。`, `努力し続ける限り、彼は成功するだろう`);
  B(`I don't know ( ) he will come.`, `whether`, [`what`, `whom`, `whatever`], `whether は「~かどうか」を表す名詞節を作る。`);
  B(`It is certain ( ) he will win.`, `that`, [`whether`, `if`, `what`], `形式主語 it の真主語は that 節(~ということ)。`);
  B(`( ) I know, he is honest.`, `As far as`, [`As soon as`, `As well as`, `As often as`], `as far as I know は「私の知る限り」。`);
  B(`Take an umbrella ( ) it rains.`, `in case`, [`even though`, `as if`, `so that`], `in case ~ は「~の場合に備えて」。`, `雨が降る場合に備えて傘を持って行きなさい`);
  B(`This is a secret between you and ( ).`, `me`, [`I`, `my`, `mine`], `前置詞 between の目的語なので目的格 me。`);

  // ===== 名詞・冠詞・代名詞 =====
  sec('BASBABABASB');
  B(`Could you give me ( ) information?`, `some`, [`an`, `many`, `a few`], `information は不可算名詞。可算用の an や many, a few は使えない。`);
  B(`Please give me a ( ) of advice.`, `piece`, [`sheet`, `cup`, `slice`], `advice は不可算名詞で、a piece of で数える。`);
  B(`The police ( ) looking for him.`, `are`, [`is`, `has`, `does`], `the police は複数扱い。`);
  B(`Ten kilometers ( ) a long distance.`, `is`, [`being`, `to be`, `does`], `距離・金額・時間のまとまりは単数扱い。`);
  B(`The news ( ) surprising.`, `is`, [`are`, `were`, `have`], `news は s で終わるが不可算名詞で単数扱い。`);
  B(`Mathematics ( ) my favorite subject.`, `is`, [`are`, `were`, `have`], `学科名の -ics は単数扱い。`);
  B(`The number of students ( ) increasing.`, `is`, [`are`, `were`, `have`], `the number of ~ は「~の数」で単数扱い。`);
  B(`A number of students ( ) absent today.`, `are`, [`is`, `was`, `has`], `a number of ~ は「多くの~」で複数扱い。`);
  B(`Each of the boys ( ) a bag.`, `has`, [`have`, `having`, `are`], `each は単数扱い。`);
  B(`He is ( ) honest man.`, `an`, [`a`, `few`, `many`], `honest の h は発音されず母音で始まるので an。`);
  B(`I have two sisters. One is a teacher and ( ) is a nurse.`, `the other`, [`another`, `other`, `others`], `2つ(2人)のうち残りの1つは the other。`);
  B(`Some like tea, and ( ) like coffee.`, `others`, [`the other`, `another`, `other`], `「~する人もいれば、...する人もいる」は Some ~, others ...。`);
  B(`I lost my pen. I must buy ( ).`, `one`, [`it`, `that`, `this`], `不特定の同種の物は one で受ける。it は特定のもの。`);
  B(`This bag is too small. Show me a bigger ( ).`, `one`, [`it`, `that`, `ones`], `形容詞が付く a bigger の後ろは one で名詞を代用する。`);
  B(`A: Do you have a pen? B: Yes, I have ( ).`, `one`, [`it`, `that`, `any`], `a pen を受ける不特定の代名詞 one。`);
  B(`Both of ( ) are my friends.`, `them`, [`they`, `their`, `themselves`], `前置詞 of の後ろは目的格。`);
  B(`She looked at ( ) in the mirror.`, `herself`, [`her`, `she`, `hers`], `主語と目的語が同一人物なので再帰代名詞 herself。`);
  B(`Help ( ) to some cake.`, `yourself`, [`you`, `your`, `yours`], `help oneself to ~ で「~を自由に取って食べる」。`);
  B(`He is a friend of ( ).`, `mine`, [`me`, `my`, `myself`], `a friend of + 所有代名詞の形(二重所有格)。`);
  B(`He has ( ) friends, so he is lonely.`, `few`, [`little`, `a few`, `a little`], `友人が「ほとんどいない」ので否定的な few。`, `彼は友達がほとんどいないので孤独だ`);
  B(`There is ( ) water left in the bottle. We can still drink a bit.`, `a little`, [`a few`, `few`, `many`], `水は不可算名詞で、「少しはある」なので a little。`);
  B(`How ( ) money do you have?`, `much`, [`many`, `few`, `long`], `money は不可算名詞なので How much。`);
  B(`I have no money with ( ).`, `me`, [`I`, `my`, `mine`], `前置詞 with の目的語は目的格 me。`);
  C(`単複の一致`, `The number of cars has increased.`, [`The number of cars have increased.`, `The number of car has increased.`, `The numbers of cars has increased.`], `the number of ~ は単数扱いなので has。`);
  C(`each`, `Each of the girls has her own room.`, [`Each of the girls have her own room.`, `Each of the girl has her own room.`, `Each of girls has her own room.`], `each of the + 複数名詞 は単数扱い。`);
  C(`neither`, `Neither of them speaks French.`, [`Neither of them speaking French.`, `Neither of them doesn't speak French.`, `Neither of them speaks not French.`], `neither に否定の意味が含まれるので、not を重ねない。`);

  // ===== 形容詞・副詞 =====
  sec('BABABBABAB');
  B(`I can ( ) believe it.`, `hardly`, [`hard`, `harder`, `hardness`], `hardly は「ほとんど~ない」。hard は「熱心に・激しく」。`);
  B(`He works ( ).`, `hard`, [`hardly`, `hardness`, `hardy`], `「熱心に働く」は副詞 hard。hardly は「ほとんど~ない」。`, `彼は熱心に働く`);
  B(`It is ( ) cold today.`, `very`, [`much`, `most`, `many`], `原級の強調は very。much は比較級や過去分詞の強調に使う。`);
  B(`She looks ( ) in the photo.`, `happy`, [`happily`, `happiness`, `happying`], `look + 形容詞で「~に見える」。副詞は使えない。`);
  B(`The soup smells ( ).`, `good`, [`well`, `goodly`, `goodness`], `smell + 形容詞で「~の匂いがする」。`);
  B(`He arrived ( ) than I expected.`, `earlier`, [`early`, `earliest`, `more early`], `than があるので比較級 earlier。`);
  B(`It rained ( ) yesterday.`, `hard`, [`hardly`, `hardness`, `hardy`], `「激しく降った」は副詞 hard。`, `昨日は激しく雨が降った`);
  B(`I have ( ) seen such a beautiful picture.`, `never`, [`ever`, `yet`, `already`], `「見たことがない」は have never p.p.。`, `こんなに美しい絵は一度も見たことがない`);
  B(`A: I'm not hungry. B: I'm not hungry, ( ).`, `either`, [`too`, `also`, `neither`], `否定文で「~も」は either。too, also は肯定文用。`);
  B(`A: I like sushi. B: ( ) do I.`, `So`, [`Neither`, `Either`, `Too`], `肯定文への同意は So + 助動詞 + 主語。`, `A:私は寿司が好きだ。B:私もです`);
  B(`A: I haven't seen it. B: ( ) have I.`, `Neither`, [`So`, `Either`, `Too`], `否定文への同意は Neither + 助動詞 + 主語。`, `A:私はそれを見ていない。B:私も見ていません`);
  B(`She speaks English very ( ).`, `well`, [`good`, `goods`, `goodly`], `動詞を修飾する副詞は well。good は形容詞。`);

  // ===== 強調・倒置・省略・同格・否定 =====
  sec('SASABSABAB');
  B(`Never ( ) seen such a beautiful sight.`, `have I`, [`I have`, `I had`, `I did`], `否定の副詞 never が文頭に出ると倒置する。`);
  B(`Hardly had he arrived ( ) it began to rain.`, `when`, [`than`, `that`, `as`], `Hardly had S p.p. when ~ で「~するとすぐに...」。`);
  B(`No sooner had I left ( ) it began to rain.`, `than`, [`when`, `that`, `then`], `No sooner had S p.p. than ~ の形。`);
  B(`Only then ( ) I realize the truth.`, `did`, [`had`, `was`, `am`], `Only + 副詞句が文頭にくると倒置する。realize は原形なので did。`, `そのときになって初めて私は真実に気づいた`);
  B(`Not only ( ) he clever, but he is also kind.`, `is`, [`he is`, `does`, `has`], `Not only が文頭に出ると倒置(be 動詞は主語の前)。`);
  B(`Rarely ( ) she go out these days.`, `does`, [`she does`, `is`, `do`], `否定の副詞 rarely が文頭にあり倒置。一般動詞なので does。`);
  B(`Under no circumstances ( ) you open this door.`, `should`, [`you should`, `you will`, `you can`], `Under no circumstances が文頭にあるので倒置し、助動詞が主語の前に来る。`);
  B(`So beautiful ( ) the view that we stayed for hours.`, `was`, [`did`, `had`, `were`], `So + 形容詞が文頭に出ると be 動詞が倒置される(was the view)。`);
  B(`It is you ( ) are wrong.`, `who`, [`which`, `whom`, `what`], `強調構文 It is ~ who ... 。`);
  B(`It was in Kyoto ( ) I first met him.`, `that`, [`which`, `what`, `who`], `強調構文 It was ~ that ... 。`);
  B(`It was yesterday ( ) I met her.`, `that`, [`which`, `what`, `who`], `強調構文 It was ~ that ... 。`);
  B(`Do ( ) careful.`, `be`, [`is`, `are`, `being`], `命令文の強調は Do + 原形。`);
  B(`The fact ( ) he lied surprised me.`, `that`, [`which`, `what`, `whether`], `fact の内容を説明する同格の that 節。`);
  B(`The news ( ) he passed made us happy.`, `that`, [`which`, `what`, `who`], `news の内容を説明する同格の that 節。`);
  B(`I have no idea ( ) she means.`, `what`, [`that`, `whether`, `where`], `means の目的語が欠けているので疑問詞 what が必要。`);
  B(`I don't think he ( ) come.`, `will`, [`won't`, `didn't`, `doesn't`], `think の否定は「~ないと思う」を意味し、that 節は肯定形にする(否定の移行)。`, `彼は来ないと思う`);
  B(`I cannot be too ( ) when driving.`, `careful`, [`carefully`, `care`, `carelessly`], `cannot be too ~ で「いくら~してもしすぎることはない」。`);
  B(`If ( ), please call me.`, `necessary`, [`necessarily`, `necessity`, `need`], `If (it is) necessary の省略。形容詞が残る。`);
  C(`倒置`, `Not only did he apologize, but he also paid for the damage.`, [`Not only he apologized, but he also paid for the damage.`, `Not only did he apologized, but he also paid for the damage.`, `Not only apologized he, but he also paid for the damage.`], `Not only が文頭にあるので疑問文語順。did の後は原形。`);
  C(`hardly`, `Hardly had I arrived when it began to rain.`, [`Hardly I arrived when it began to rain.`, `Hardly I had arrived when it began to rain.`, `Hardly had arrived I when it began to rain.`], `Hardly が文頭にあるので Hardly had S p.p. の倒置。`);

  // ===== 使役・第5文型 =====
  sec('ASABSABABA');
  B(`I had my car ( ).`, `repaired`, [`repair`, `repairing`, `to repair`], `have O p.p. で「O を~してもらう」。`);
  B(`She made me ( ) the room.`, `clean`, [`to clean`, `cleaning`, `cleaned`], `make O 原形で「O に~させる」。`);
  B(`My mother let me ( ) out late.`, `stay`, [`to stay`, `staying`, `stayed`], `let O 原形で「O に~させてやる」。`);
  B(`He got his brother ( ) the homework.`, `to do`, [`do`, `doing`, `done`], `get O to do で「O に~させる・してもらう」。`);
  B(`I had him ( ) my bag.`, `carry`, [`to carry`, `carrying`, `carried`], `have O 原形で「O に~してもらう」。`);
  B(`I found the box ( ).`, `empty`, [`emptily`, `emptiness`, `to empty`], `find O C の C には形容詞が来る。`, `私はその箱が空だと分かった`);
  B(`The news made her ( ).`, `happy`, [`happily`, `happiness`, `happying`], `make O C の C には形容詞が来る。`);
  B(`They named the baby ( ).`, `Ken`, [`to Ken`, `as Ken`, `at Ken`], `name O C で「O を C と名づける」。前置詞は不要。`);
  B(`I want this work ( ) by tomorrow.`, `done`, [`do`, `doing`, `to do`], `仕事は「なされる」側なので want O p.p.。`);
  B(`Keep the door ( ).`, `closed`, [`closing`, `to close`, `being closed`], `keep O p.p. で「O を~の状態に保つ」。`);
  B(`I couldn't make myself ( ) in English.`, `understood`, [`understand`, `understanding`, `to understand`], `make oneself understood で「自分の考えを分かってもらう」。`);
  B(`He left the window ( ).`, `open`, [`opening`, `to open`, `opens`], `leave O C で「O を~のままにしておく」。形容詞 open。`);
  B(`The teacher told us ( ) quiet.`, `to be`, [`be`, `being`, `are`], `tell O to do の形。`);
  B(`I want you ( ) here.`, `to stay`, [`stay`, `staying`, `stayed`], `want O to do の形。`);
  B(`I'll let you ( ) the result.`, `know`, [`to know`, `knowing`, `known`], `let O 原形の形。`);
  C(`p.p. の使役`, `I had my bicycle stolen last night.`, [`I had my bicycle steal last night.`, `I was stolen my bicycle last night.`, `I had my bicycle stealing last night.`], `have O p.p. で被害「O を~される」。`);
  C(`let`, `Please let me know when you arrive.`, [`Please let me to know when you arrive.`, `Please let me knowing when you arrive.`, `Please let know me when you arrive.`], `let O 原形の語順。`);

  // ===== 動詞の語法 =====
  sec('BABASBABAB');
  B(`Please ( ) me what to do.`, `tell`, [`say`, `speak`, `talk`], `tell + 人 + 疑問詞 to do の形をとるのは tell。`);
  B(`He ( ) me a story.`, `told`, [`said`, `spoke`, `talked`], `tell は「人に話を語る」の意味で目的語を二つとれる。`);
  B(`She can ( ) English well.`, `speak`, [`say`, `tell`, `talk`], `言語を話すは speak。`);
  B(`My father ( ) me to study.`, `told`, [`said`, `spoke`, `talked`], `tell O to do で「O に~するように言う」。`);
  B(`She ( ) the baby on the bed.`, `laid`, [`lay`, `lied`, `laying`], `lay(横たえる)は他動詞で過去形は laid。`);
  B(`She ( ) down on the sofa.`, `lay`, [`laid`, `lied`, `layed`], `lie(横になる)の過去形は lay。`);
  B(`They ( ) the price last month.`, `raised`, [`rose`, `arose`, `risen`], `raise(上げる)は他動詞で過去形は raised。`);
  B(`The price ( ) last month.`, `rose`, [`raised`, `risen`, `arisen`], `rise(上がる)は自動詞で過去形は rose。`);
  B(`Would you ( ) me your pen?`, `lend`, [`borrow`, `take`, `use`], `lend + 人 + 物 は「人に物を貸す」。`);
  B(`May I ( ) your pen?`, `borrow`, [`lend`, `give`, `save`], `「借りる」は borrow。`, `あなたのペンを借りてもいいですか`);
  B(`I ( ) Tokyo yesterday.`, `reached`, [`arrived`, `got`, `went`], `reach は他動詞で前置詞なしで場所をとる。arrive や go は前置詞が必要。`, `私は昨日東京に着いた`);
  B(`She ( ) a doctor last year.`, `married`, [`married to`, `married with`, `got married with`], `marry は他動詞で前置詞なしで目的語をとる。`);
  B(`This car ( ) me $20,000.`, `cost`, [`spent`, `needed`, `wasted`], `cost + 人 + 金額で「人に金がかかる」。`);
  B(`It ( ) two hours to finish.`, `took`, [`paid`, `spent`, `made`], `It takes 時間 to do で「~するのに時間がかかる」。`);
  B(`The story ( ) true.`, `sounds`, [`hears`, `listens`, `tells`], `sound + 形容詞で「~に聞こえる」。`);
  B(`Will you ( ) to the radio?`, `listen`, [`hear`, `watch`, `see`], `listen to ~ で「~を注意して聞く」。`);
  B(`I ( ) him play the piano.`, `heard`, [`listened`, `looked`, `spoke`], `hear O 原形で「O が~するのが聞こえる」。listen は前置詞 to が必要。`);
  B(`Please ( ) yourself at home.`, `make`, [`do`, `take`, `get`], `make oneself at home で「くつろぐ」。`);
  B(`I'll ( ) you a call tonight.`, `give`, [`have`, `do`, `take`], `give + 人 + a call で「人に電話する」。`);
  B(`Let's ( ) a break.`, `take`, [`do`, `put`, `hold`], `take a break で「休憩する」。`);
  B(`He ( ) a mistake.`, `made`, [`did`, `took`, `put`], `make a mistake で「間違いをする」。`);
  B(`Could you ( ) me how to use this?`, `tell`, [`explain`, `say`, `speak`], `explain は人を直接目的語にとれない。tell + 人 + how to do が正しい。`);
  B(`We ( ) the problem yesterday.`, `discussed`, [`discussed about`, `discussed on`, `discussed for`], `discuss は他動詞で前置詞をとらない。`);
  B(`He ( ) the room quietly.`, `entered`, [`entered into`, `entered in`, `went in`], `enter は他動詞で前置詞をとらない。`);
  B(`She ( ) her mother.`, `resembles`, [`resembles to`, `resembles with`, `is resembled`], `resemble は他動詞で前置詞をとらず、受動態にもならない。`);
  B(`He got married ( ) a nurse.`, `to`, [`with`, `of`, `for`], `get married to ~ で「~と結婚する」。`);
  B(`I apologize ( ) my mistake.`, `for`, [`with`, `of`, `on`], `apologize for ~ で「~について謝る」。`);
  B(`I'm waiting ( ) the bus.`, `for`, [`to`, `at`, `on`], `wait for ~ で「~を待つ」。`);
  B(`He was robbed ( ) his watch.`, `of`, [`from`, `for`, `with`], `rob 人 of 物 で「人から物を奪う」。`);
  C(`indirect question`, `He asked me where I had been.`, [`He asked me where had I been.`, `He asked me where I was been.`, `He asked me where been I.`], `間接疑問は平叙文の語順。時制の一致で had been。`);
  C(`suggest`, `He suggested that I should go there.`, [`He suggested me to go there.`, `He suggested that me go there.`, `He suggested me going there.`], `suggest は「suggest + that S (should) 原形」の形をとる。`);
  C(`be said to`, `He is said to be rich.`, [`He says to be rich.`, `It is said him to be rich.`, `He is said that he is rich.`], `be said to do (~と言われている)の形。`);
  C(`最上級`, `This is the most interesting book I have ever read.`, [`This is most interesting book I have ever read.`, `This is the more interesting book I have ever read.`, `This is the most interestingest book I have ever read.`], `最上級には the を付ける。長い形容詞は most を前に置く。`);
  C(`as ~ as`, `She is as tall as her sister.`, [`She is as taller as her sister.`, `She is as tall than her sister.`, `She is so tall than her sister.`], `同等比較は as + 原級 + as。`);
  C(`受動態の状態`, `The window was left open all night.`, [`The window left open all night.`, `The window was left opening all night.`, `The window was leave open all night.`], `leave O C の受動態は was left open。`);
  C(`little`, `There is little hope of his recovery.`, [`There are little hope of his recovery.`, `There is few hope of his recovery.`, `There is a few hope of his recovery.`], `hope は不可算名詞なので little と単数の is を使う。`);

  registerDeck({id:'bunpo_eh', level:'e_h', name:'英文法', prompt:'', modes:['qa'], items: items});
})();
