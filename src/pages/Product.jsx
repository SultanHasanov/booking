import { Button, Typography, Tabs } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { DeleteFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import dishes from "../data";
import { useTimeContext } from "../TimeContext";
const { Text } = Typography;
const { TabPane } = Tabs;

// Example dishes with categories
const categories = [
  { id: "1", name: "Блюда" },
  { id: "6", name: "Фастфуд" },
  { id: "2", name: "Напитки" },
  { id: "3", name: "Соки" },
  { id: "4", name: "Хлеб" },
  { id: "5", name: "Кофе" },
];

const Product = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState("1");

  const { setActiveTab } = useTimeContext();

  const navigate = useNavigate();

  const handleAddToCart = (dishId) => {
    const newCart = [...cart];
    const dishIndex = newCart.findIndex((item) => item.id === dishId);

    if (dishIndex > -1) {
      newCart[dishIndex].quantity += 1;
    } else {
      newCart.push({
        id: dishId,
        quantity: 1,
        name: dishes.find((dish) => dish.id === dishId).name,
        price: dishes.find((dish) => dish.id === dishId).price,
      });
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDecreaseQuantity = (dishId) => {
    const newCart = [...cart];
    const dishIndex = newCart.findIndex((item) => item.id === dishId);

    if (dishIndex > -1 && newCart[dishIndex].quantity > 1) {
      newCart[dishIndex].quantity -= 1;
    } else {
      newCart.splice(dishIndex, 1);
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleReserveTable = () => {
    if (cart.length === 0) {
      setActiveTab("order_reservation");
    } else {
      setActiveTab("order");
    }
    navigate("/booking");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveFromCart = (dishId) => {
    const newCart = cart.filter((item) => item.id !== dishId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const filteredDishes = dishes.filter(
    (dish) => dish.category === selectedCategory
  );

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <Tabs defaultActiveKey="1" onChange={setSelectedCategory}>
          {categories.map((category) => (
            <TabPane tab={category.name} key={category.id} />
          ))}
        </Tabs>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {filteredDishes.map((dish) => {
          const currentDish = cart.find((item) => item.id === dish.id);
          const quantity = currentDish ? currentDish.quantity : 0;

          return (
            <div
              key={dish.id}
              style={{
                width: "115px",
                boxSizing: "border-box",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                textAlign: "center",
                position: "relative",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div onClick={() => handleAddToCart(dish.id)}>
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                  {dish.emoji}
                </div>
                <span>
                  <b style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {dish.name}
                  </b>
                </span>
                <div style={{ margin: "10px 0 10px" }}>
                  <b style={{ fontSize: "14px", fontWeight: "bold" }}>Цена:</b>{" "}
                  {dish.price} ₽
                </div>
              </div>
              <div className="btn-product">
                <button
                  onClick={() => handleDecreaseQuantity(dish.id)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <MinusOutlined />
                </button>
                <button
                  onClick={() => handleAddToCart(dish.id)}
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <PlusOutlined />
                </button>
              </div>
              {quantity > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "3px",
                    border: "0.3px solid black",
                    color: "green",
                    width: "20px",
                    textAlign: "center",
                    padding: "2px",
                    borderRadius: "50%",
                  }}
                >
                  <b>{quantity}</b>
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "left", margin: "40px 0 10px 0" }}>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              style={{ marginBottom: "5px", position: "relative" }}
            >
              <Text
                strong
                style={{
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                {item.name} x{item.quantity} = {item.price * item.quantity} ₽
                <DeleteFilled
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#f44336",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
              </Text>
            </div>
          ))
        ) : (
          <Text>Корзина пуста</Text>
        )}

        <div style={{ marginTop: "10px" }}>
        <Text style={{fontSize: 17, color: 'green', textDecoration: "underline" }} strong>Итоговая сумма: {calculateTotal()} ₽</Text>
        </div>

        <Button
          size="large"
          onClick={handleReserveTable}
          style={{
            position: "fixed", // Зафиксируем кнопку
            bottom: "10px", // Расстояние от нижней границы экрана
            right: "20px", // Центрируем кнопку по горизонтали
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            width: "auto", // Ширина кнопки будет автоматически подстраиваться
            cursor: "pointer",
          }}
        >
          {cart.length !== 0 ? "Оформить заказ" : "Бронь столика"}
        </Button>
      </div>
    </div>
  );
};

export default Product;
