---
title: 'アクティビティ図とは？'
---

# アクティビティ図

## アクティビティ図とは？

アクティビティ図は、プロセスやアルゴリズムの流れを表現する UML の図の 1 つで、アクションと制御フローを表示します。アクティビティ図には、開始点、終了点、アクション、分岐、マージ、ループ、例外処理など、さまざまな種類の要素を含めることができます。

## 基本的な例

アクティビティのラベルは":"ではじまり、";"で終了します。

```
@startuml
:Hello world;
:This is defined on
@enduml
```

## 開始/終了

図の開始と終了を示すために、start と stop もしくは end を使用することができます。

```
@startuml
start
:Hello world;
:This is defined on
stop
@enduml
```

## 条件文

図に条件分岐を追加したい場合は、ラベルは括弧を使用することで与えることができます。
3 種類の構文を使うことができます。

### 1. if 文法

キーワード if, then, else を使用することができます。
if 文法は、以下のような形式で記述されます。

- if (...) then (...)

```
@startuml
start
if (x > 0) then (yes)
    :xを2倍にする;
else (no)
    :xに1を足す;
endif
stop
@enduml
```

この文法では、条件が成立した場合の処理と、成立しなかった場合の処理をそれぞれ指定します。endif は、if ブロックの終了を示すために使用されます。
他にも次のような書き方があります。

- if (...) is (...) then

```
@startuml
:input color;
if (color?) is (red) then
    :print red;
else
    :print not red;
@enduml

```

- if (...) equals (...) then

```
@startuml
if (counter?) equals (5) then
    :print 5;
else
    :print not 5;
@enduml
```

#### 複数条件

いくつもの条件分岐がある場合には、キーワード elseif を使用できます。

```
@startuml
start
if (condition A) then (yes)
  :Text 1;
elseif (condition B) then (yes)
  :Text 2;
  stop
(no) elseif (condition C) then (yes)
  :Text 3;
(no) elseif (condition D) then (yes)
  :Text 4;
else (nothing)
  :Text else;
endif
stop
@enduml
```

また、!pragma useVerticalIf on を使用することで、垂直モードの分岐にできます。

```
@startuml
!pragma useVerticalIf on
start
if (condition A) then (yes)
  :Text 1;
elseif (condition B) then (yes)
  :Text 2;
  stop
elseif (condition C) then (yes)
  :Text 3;
elseif (condition D) then (yes)
  :Text 4;
else (nothing)
  :Text else;
endif
stop
@enduml
```

### 2. switch 文法

キーワード switch, case, endswitch を使用することができます。
switch 文法は、以下のような形式で記述されます。

```
@startuml
start
switch (test?)
case (1)
    :(pritn "test is 1");
case (2)
    :(print "test is 2");
endswitch
stop
@enduml
```

この文法では、複数の条件に対する処理を記述することができます。switch ブロック内で case 文を使用して、各条件が成立した場合の処理を指定します。endswitch は、switch ブロックの終了を示すために使用されます。

#### アクションの停止を伴う条件分

kill, detach を使用することで if 文内でアクションを停止することでアクションを停止することができます。

- kill

```
@startuml
if (condition?) then
  #pink:error;
  kill
endif
#palegreen:action;
@enduml

```

- detach

```
@startuml
if (condition?) then
  #pink:error;
  detach
endif
#palegreen:action;
@enduml

```

### 3. repeat-while 文法

繰り返し処理（後判定）がある場合には、repeat, repeat while を使用できます。
repeat-while 文法は、以下のような形式で記述されます。

```
@startum
start
repeat
  :read data;
  :generate diagrams;
repeat while (more data?)
stop
@enduml

```

この文法では、条件が成立している限り、繰り返し処理を実行します。repeat 文の後には、繰り返し処理が記述されます。while 文の後には、繰り返しの条件を記述します。条件が成立している場合は、繰り返し処理を続けます。条件が成立しなくなると、処理を終了します。

アクティビティを repeat の戻り先にすることもできます。
また、backward キーワードを使用して、戻りのパスにアクティビティを挿入することもできます。

```
@startuml
start
repeat :foo as starting label;
  :read data;
  :generate diagrams;
backward:"This is backward";
repeat while (more data?)
stop
@enduml

```

#### repeat の中断

アクションの後で break キーワードを使うと、ループを中断することができます。

```
@startuml
start
:count = 0;
repeat
  :count = count + 1;
  if (count >= 5) then (true)
    break
  endif
  :print(count);
repeat while (true)
stop
@enduml

```

繰り返し処理（前判定）がある場合には while, endwhile を使用できます。

```
@startuml
start
while (data available?)
  :read data;
  :generate diagrams;
endwhile
stop
@enduml
```

endwhile または、is を使用してラベルを与えれます。

```
@startuml
while (check filesize ?) is (not empty)
  :read file;
endwhile (empty)
:close file;
@enduml

```

detach を使用して無限ループを作る際には, -[hidden]-> を使用することで矢印を隠すことができます。

```
@startuml
:Step 1;
if (condition1) then
  while (loop forever)
   :Step 2;
  endwhile
  -[hidden]->
  detach
else
  :end normally;
  stop
endif
@enduml

```

### 並列処理

fork, fork again, end fork, endmerge を使って並列処理を記述できます。

- 単純な fork

```
@startuml
start
fork
  :action 1;
fork again
  :action 2;
end fork
stop
@enduml


```

- end merge を使った fork

```
@startuml
start
fork
  :action 1;
fork again
  :action 2;
end merge
stop
@enduml


```

#### 処理の分岐

split、split again、end split を使って、プロセスの分岐を表すことができます。

```
@startuml
start
split
   :A;
split again
   :B;
split again
   :C;
split again
   :a;
   :b;
end split
:D;
end
@enduml

```

- 入力の分岐を表現するには、 hidden を使って矢印を隠します。

```
@startuml
split
   -[hidden]->
   :A;
split again
   -[hidden]->
   :B;
split again
   -[hidden]->
   :C;
end split
:D;
@enduml

```

- 出力の分岐を表現するには、kill または detach を使用します。

```
@startuml
start
split
   :A;
   kill
split again
   :B;
   detach
split again
   :C;
   kill
end split
@enduml

```

```
@startuml
start
split
   :A;
   kill
split again
   :b;
   :c;
   detach
split again
   (Z)
   detach
split again
   end
split again
   stop
end split
@enduml

```