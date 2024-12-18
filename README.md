# RingsOfWisdom

## Состав команды
### 2 курс
- **2.4 Игнатенко Николай Сергеевич**
- 2.4 Череповский Илья Алексеевич
- 2.4 Новиков Александр Евгеньевич

### 1 курс
- 1.3 Морозов Роман Алексеевич
- 1.3 Грошев Захар Игоревич
- 1.4 Оганян Виталий Тигранович

## Описание идеи

Вебсервис на [ASP.NET core](https://dotnet.microsoft.com/en-us/apps/aspnet) версии 4.8 для обучения основам игры в ЧГК. По механикам за основу взят [GO MAGIC](https://gomagic.org/ru/go-problems/). <br />
Всего есть 4 навыка (за пд точно реализуем 2), каждый навыков состоит из поднавыков. Чтобы прокачивать поднавыки, надо решать квизы - набор из двух вопросов.

## Тип проекта

Вебсервис на [ASP.NET core](https://dotnet.microsoft.com/en-us/apps/aspnet).

## Цель

Предоставить образовательную программу по игре ЧГК в удобной форме древа навыков.

## Механики

### Решение квизов
- квиз состоит из 2 вопросов. Если все вопросы взяты, квиз считается пройденным
- в день будет установлен лимит на решение квизов = 3. Его можно увеличить в магазине
- за решении квизов на счёт начисляется валюта (кольца) и опыт

### Магазин
- в магазине можно увеличить лимт квизов в день на 1 за кольца

### Профиль
- отображается статистика: сколько вопросов взято, не взято, прогресс общий, прогресс по конкретным навыкам

## Задачи
- [ ] ***Поднятие бд с 4 листами***
  - [ ] **лист с юзерами с полями:**
    - [ ] имя (первичный ключ)
    - [ ] опыт главынй
    - [ ] статус??? (надо ли??)
    - [ ] кол-во взятых вопросов
    - [ ] монетки
    - [ ] опыт область знания 1
    - [ ] опыт область знания 2
    - [ ] ....
    - [ ] опыт область знания N
  - [ ] **лист с вопросами с полями:**
    - [ ] номер (первичный ключ)
    - [ ] текст вопроса
    - [ ] ответ
    - [ ] категория
    - [ ] сложность
    - [ ] навык (третьичный ключ)
    - [ ] поддерево (вторичный ключ)
  - [ ] **лист с навыками  (может словарь?)**
    - [ ] поддерево (если навык совпадет с поддеревом, то это поддерево)
    - [ ] навык (первичный ключ)
    - [ ] иконка
    - [ ] справка
  - [ ] **лист с решёнными вопросами** 
    - [ ] номер (первичный ключ)
    - [ ] имя пользователя
    - [ ] ответ
    - [ ] правильный ответ
    - [ ] статус (решён верно, решён неверно) boolean
    - [ ] имя админа, проверившего (по умолчанию null)
        
- [ ] ***Авторизация***
  - [ ] *Сделать html - окно*
    - [ ] почта
    - [ ] пароль
    - [ ] видно/не видно пароль
    - [ ] кнопка входа
    - [ ] Масштабирование под экран
  - [ ] переход в дерево навыков
- [ ]  ***Регистрация***
  - [ ]  *Сделать html - окно*
    - [ ]  почта
    - [ ]  имя
    - [ ]  пароль
    - [ ]  видно/не видно пароль
    - [ ]   Масштабирование под экран
  - [ ]   Механизм подтверждения через почту
  - [ ]   Добавление в Бд юзера
  - [ ]   переход в авторизацию
- [ ] ***Профиль***
  - [ ] *Сделать html - окно*
    - [ ] Отображать фото
    - [ ] Отображать имя
    - [ ] Отображать количество монет
    - [ ] Отображать количество взятых вопросов
    - [ ] Отображать опыт глобальный
    - [ ] Отображать опыт в областях занания
    - [ ] Масштабирование под экран
  - [ ] Возможность менять фото
- [ ] ***Основное дерево навыков***
  - [ ] *Сделать html - окно*
    - [ ]  4 кружочка с навыками. 2 под замочком, 2 открытые
    - [ ]   у кружочков поддеревьев иконки
    - [ ]   у кружочков поддеревьев справки
    - [ ]   названия
    - [ ]    Масштабирование под экран
  - [ ] механизм заполнения полей, вышеуказанных
  - [ ] механизм перехода в поддеррево
- [ ] ***Поддеревья***
  - [ ] *Сделать html - окно ШАБЛОН для шаблонизатора*
    - [ ]  у каждого кружочка навыков -  справка
    - [ ]  у кружочков навыков иконки
    - [ ]  у кружочков навыков уровень
    - [ ]  у кружочков навыков прогресс
    - [ ]   Масштабирование под экран
  - [ ]  механизм заполнения полей, вышеуказанных
  - [ ] Механизм заполнения шаблона кружочками навыков из бд.
  - [ ] анимация открытия квиза на этом же url
  - [ ] **КВИЗ**
    - [ ] *html шаблон*
      - [ ] кнопка выхода
      - [ ] текст
      - [ ] поле ввода ответа
      - [ ] количество вопросов в квизе и их статус (решён верно, зелёный/ решён неверно, красный/ не решён, серый)
      - [ ] стрелочка перехода между вопросами
      - [ ] окно завершения квиза с количеством полученного опыта и монеток
      - [ ] Масштабирование под экран
    - [ ] механизм счёта монеток
    - [ ]  механизм счёта опыта
    - [ ]  механзим открытия квиза
    - [ ]  механизм взятия вопроса (ввод и отправление в бд)
- [ ] ***Окно админа*** сразу при входе в аккаунт админа
  - [ ] **проверка вопросов**
    - [ ] *html-окно*
      - [ ]  текст вопроса
      - [ ]  ответ
      - [ ]  верно/неверно Бокс с выбором
      - [ ]  Масштабирование под экран
    - [ ]  механизм проверки и замены статуса в бд
    - [ ]  добавление опыта и монеток пользователю за решение
- [ ]  ***Навигация в низу экрана***
  - [ ]  профиль, связать
  - [ ]  древо навыков, связать

***БУДУЩЕЕ***
- [ ] магазин
- [ ] рейтинг
- [ ] события

  




