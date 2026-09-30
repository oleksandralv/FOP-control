// Чекаємо, поки завантажиться вся сторінка
document.addEventListener("DOMContentLoaded", ()=> {

    / 1. ЛОГІКА ЗГОРТАННЯ ОКРЕМОЇ КАРТКИ/
    // Знаходимо всі шапки карток на сторінці
    const cards = document.querySelectorAll(".fop-card")

    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            // Якщо картка РОЗГОРНУТА (тобто НЕ має класу collapsed)
            if (!card.classList.contains("collapsed")) {
                // Перевіряємо: якщо клікнули МИМО хедера (шапки), то нічого не робимо
                if (!event.target.closest(".fop-card-header")) {
                    return; // Зупиняємо код, картка не закриється
                }
            }
            // В усіх інших випадках (коли картка згорнута або коли клікнули чітко по хедеру) — перемикаємо стан
            card.classList.toggle("collapsed");
        });
    });

    // 2. ЛОГІКА КНОПКИ "ЗГОРНУТИ / РОЗГОРНУТИ ВСІХ"
    const toggleAllBtn=document.getElementById("btn-toggle-all");
    let allCollapsed=true; // Початковий стан: усе згорнуто

    toggleAllBtn.addEventListener("click", ()=> {
        const allCards = document.querySelectorAll(".fop-card");
        allCollapsed = !allCollapsed; // Змінюємо стан на протилежний
    
         allCards.forEach(card => {
            if (allCollapsed){
                card.classList.add("collapsed");
            } else {
                card.classList.remove("collapsed");
            }
        });

        // Міняємо текст на кнопці залежно від стану
        toggleAllBtn.textContent = allCollapsed ? "Згорнути всіх" : "Розгорнути всіх";
    });

    // 3. ЛОГІКА ПЕРЕМИКАННЯ ВКЛАДОК МЕНЮ
    const menuItems = document.querySelectorAll(".menu-item");
    const sections=document.querySelectorAll("main>section");

    menuItems.forEach(item=>{
        item.addEventListener("click", (event)=>{
            event.preventDefault();// Скасовуємо стандартний стрибок сторінки по посиланню #

            const targetSectionId=item.getAttribute("data-target");

            // Якщо у пункту меню немає прив'язки до секції (наприклад, для лімітів, які ми ще не робили) — нічого не робимо
            if (!targetSectionId) return;

            // А) Перемикаємо активний стиль підсвічування в меню
            menuItems.forEach(menu=>menu.classList.remove("active"));
            item.classList.add("active");

            // Б) Ховаємо всі секції та показуємо лише ту, на яку клікнули
            sections.forEach(section=>{
                if (section.id===targetSectionId){
                    section.classList.remove("hidden");// Показуємо обрану сторінку
                } else {
                    section.classList.add("hidden");// Ховаємо всі інші
                }
            })

        })
    })
});
