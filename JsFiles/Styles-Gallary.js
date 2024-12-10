document.addEventListener("DOMContentLoaded", () => {
  // تحقق من المستخدم الحالي عند تحميل الصفحة
  const logoutButton = document.getElementById("logoutButton");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "index.html"; // إعادة توجيه إلى صفحة تسجيل الدخول
  } else {
    document.getElementById("adminName").textContent = currentUser.username;
  }

  // زر تسجيل الخروج
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }

  // فتح وإغلاق المودال لإضافة صورة جديدة
  const openModalButton = document.getElementById("openModalButton");
  const modal = document.getElementById("addimageModal");
  const closeModal = document.getElementById("closeModal");
  const addImageForm = document.getElementById("addImageForm");
  const imageList = document.querySelector(".ListImage");

  openModalButton.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // إضافة صورة جديدة إلى القائمة
  addImageForm.addEventListener("submit", (event) => {
    event.preventDefault(); // منع التحديث الافتراضي للصفحة

    const imageFile = document.getElementById("imageFile").files[0];
    const description = document.getElementById("description").value;

    if (imageFile && description) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = document.createElement("div");
        newImage.classList.add("Image1");

        const img = document.createElement("img");
        img.src = reader.result; // استخدام الصورة المحملة
        img.alt = description;
        img.classList.add("avatar");

        const paragraph = document.createElement("p");
        paragraph.textContent = description;

        newImage.appendChild(img);
        newImage.appendChild(paragraph);

        imageList.appendChild(newImage);
        modal.style.display = "none"; // إغلاق المودال
        addImageForm.reset(); // إعادة تعيين الحقول
      };
      reader.readAsDataURL(imageFile);
    } else {
      alert("Please select an image and enter a description.");
    }
  });

  // تمييز الصفحة النشطة في القائمة الجانبية
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a");

  sidebarLinks.forEach((link) => {
    if (link.href.includes(currentPath)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // تحقق من دور المستخدم لتحديد الصفحة المناسبة
  const villageManagementLink = document.querySelector("a[href='VillageManagement.html']");

  if (villageManagementLink) {
    villageManagementLink.addEventListener("click", (event) => {
      event.preventDefault();

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser) {
        if (currentUser.role === "admin") {
          window.location.href = "VillageManagement.html";
        } else if (currentUser.role === "user") {
          window.location.href = "VillageManagementForUser.html";
        }
      } else {
        window.location.href = "index.html";
      }
    });
  }
});
