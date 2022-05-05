
# Kozhindev-test-exchanges

## Установка и запуск

Все команды запускать в папке проекта

##### Установка

Выполнить `yarn`


##### Запуск webpack сервера

1. Выполнить `yarn watch`
2. Открыть http://localhost:9991/

##### Запуск storybook-сервера

1. Выполнить `yarn storybook`
2. Открыть http://localhost:6006/


### Включение eslint в IDE

Для WebStorm/PhpStorm идем в `Настройки` -> `Langiages & Frameworks` -> `Code Quality Tools` -> `ESLint`

И включаем там пункты `Automatic ESLing configuration` и `Run eslint --fix on save`

### Настройка обработчика ошибок Sentry

1. Создать проект в Sentry
2. В файле `.gitlab-ci.yml` заменить `REPLACE_WITH_REAL_SENTRY_DSN` на верный dsn и раскомментировать строку


## Правила кода


#### Компонент

Для примера возмьем компонент `UpperMenu`.

Каждый компонент должен быть расположен в отдельной одноименной папке `UpperMenu`
В этой папке должны быть следующие файлы
- `UpperMenu.scss` - файл со стилями для этого компонента
- `UpperMenu.story.js` - storybook для компонента
- `UpperMenu.tsx` - сосбственно сам компонент
- `index.ts` - файл, экспортирующий данный компонент - для того чтобы в других компонентах при импорте `UpperMenu`
  не нужно было писать путь включающий папку `UpperMenu`


#### Виды компонентов

В проекте мы используем такие виды компонентов:

1. Страница - компонент, который представляет из себя отдельную страницу сайта (например главная страница, страница
   контактов и др.)

   Название компонентов такого типа всегда оканчивается на "Page", например "IndexPage", "DemoPage", ...
   Такие компоненты располагаются в `src/routes`.

2. Отдельные view-компоненты - блоки, на которые разбивается страница. Такие блоки используются только в родительском
   компоненте и нигде более. Например, на странице "ContactsPage" может потребоваться для упрощения кода вынести блок
   с телефонами в отдельный компонент "PhoneNumbers"

   Такие компоненты располагаются в подпапке `views` родительского компонента. Например
   `src/routes/ContactsPage/views/PhoneNumbers`

3. Общие компоненты - используются в различных родительских компонентах. Например, компонент "SideMenu" может
   использоваться на нескольких страницах.

   Такие компоненты располагаются в `src/shared`, например `src/shared/SideMenu`

#### Вёрстка по БЭМ

[Вёрстка по БЭМ](https://ru.bem.info/methodology/quick-start/) предполагает компонентный подход.

В нашем случае это означает что для каждого компонента создается отдельный файл стилей. Например, для компонента
"UpperMenu" должен быть создан файл `UpperMenu.scss`, в котором должен быть определен блок css-классо UpperMenu,
и все правила стилей должны задаваться для этого блока, его элементов и/или модификаторов.

#### Storybook

Для каждого компонента должен быть создан storybook-файл `*.story.js`

В нем необходимо представить компонент в различных вариантах, чтобы можно было в едином месте просмотреть все возможные
виды компонента с разными настройками.

Например, если компонент - кнопка, то нужно в storybook-файле показать кнопку обычную, в нажатом виде,
с наведением курсора, и пр.
