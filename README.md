# Booking App

## Описание проекта
Приложение для бронирования столиков в ресторане или кафе. Позволяет пользователям выбрать столик, указать данные для бронирования, а затем отправить заказ администратору через WhatsApp.

## Функционал
- Выбор столика для бронирования
- Заполнение формы с данными пользователя
- Отправка информации о брони в WhatsApp
- Корзина с выбранными блюдами
- Автоматический расчет итоговой стоимости заказа
- Обновление статуса столиков (свободный, забронированный, в ожидании)

## Используемые технологии
- React.js
- React Router
- Ant Design (UI-компоненты)
- react-input-mask (маски ввода)
- LocalStorage (для хранения корзины)

## Установка и запуск
### 1. Клонирование репозитория
```sh
git clone https://github.com/SultanHasanov/booking.git
cd booking
```

### 2. Установка зависимостей
```sh
npm install
```

### 3. Запуск проекта
```sh
npm run dev
```

## Основные компоненты
### 1. `ReservationModal.js`
Модальное окно для бронирования столика. Включает:
- Поля ввода (имя, телефон, время, количество человек)
- Отображение товаров из корзины
- Подсчет итоговой стоимости
- Отправку данных в WhatsApp

### 2. `ButtonCard.js`
Компонент кнопок выбора столиков. Отображает статус:
- **Зеленый** — свободный
- **Серый** — забронированный
- **Оранжевый** — в ожидании

При клике на свободный столик открывается `ReservationModal`.

## Как работает отправка в WhatsApp?
В файле `ReservationModal.js` есть функция `handleFinish`, которая отправляет данные администратору в WhatsApp после заполнения формы.

