/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

"use strict";

// Создаём функцию для проверки введённых значений, которая принимает вопрос
const checkAnswer = (question) => {
    let isCountQuestion = false; // создаём булеву переменную, хранит тип вопроса: ждём число или текст
    let answer = ""; // создаём переменную для хранения ответа пользователя

    // Если в тексте вопроса присутствуют слова 'Сколько' или 'сколько'
    if (question.includes("Сколько") || question.includes("сколько")) {
        // то мы ждём в качестве ответа число, флаг поднимаем
        isCountQuestion = true;
    }

    // сперва задаём вопрос, потом проверяем. Если проверка не прошла, задаём ещё раз
    do {
        answer = prompt(question, ""); // задаём вопрос и записываем ответ
    } while (
        answer === "" || // если ответ пустая строка
        answer === null || // или нажата кнопка "Отмена"
        answer.length > 50 || // или длина строки больше 50 символов
        (isNaN(+answer) && isCountQuestion) // или, мы ждём число, а получили текст
    ); // ТОГДА ЕЩЁ РАЗ СПРАШИВАЕМ
    // Если ни одно из этих условий не выполнилось, то получили нужный ответ

    // возвращаем число, если ждём число, иначе просто возвращаем текст
    return isCountQuestion ? +answer : answer;
};

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    private: false,
    start: function () {
        this.count = checkAnswer("Сколько фильмов вы уже посмотрели?");
    },
    detectPersonalLevel: function () {
        switch (true) {
            case this.count < 10:
                alert("Просмотрено довольно мало фильмов");
                break;
            case this.count >= 10 && this.count < 30:
                alert("Вы классический зритель");
                break;
            case this.count >= 30:
                alert("Вы киноман");
                break;
            default:
                alert("Произошла ошибка");
                break;
        }
    },
    askAboutFilms: function () {
        for (let i = 0; i < 2; i++) {
            const lastMovie = checkAnswer("Один из последних просмотренных фильмов?"),
                lastMovieRating = checkAnswer("На сколько оцените его?");

            this.movies[lastMovie] = lastMovieRating;
        }
    },
    writeYourGenres: function () {
        let genres = checkAnswer(`Введите ваши любимые жанры через запятую:`);
        this.genres = genres.split(",");
        this.genres.forEach((genre, index) => {
            console.log(`Любимый жанр #${index + 1} - это ${genre}`);
        });
    },
    showMyDB: function () {
        if (this.private === false) {
            console.log(this);
        }
    },
    toggleVisibleMyDB: function () {
        this.private = !this.private;
    }
};

// проводим опрос
// personalMovieDB.start();
// personalMovieDB.detectPersonalLevel();
// personalMovieDB.askAboutFilms();
personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB();