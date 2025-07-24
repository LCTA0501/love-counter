document.addEventListener('DOMContentLoaded', () => {
  const message =
    "Hành trình của chúng ta bắt đầu từ hôm nay. Mỗi khoảnh khắc bên nhau sẽ là một viên gạch xây nên ngôi nhà hạnh phúc. Cùng nhau, chúng ta sẽ viết nên một câu chuyện tình yêu vĩnh cửu. ❤️";

  const photoUrls = [
    "img/a1.jpg", "img/a2.jpg", "img/a3.jpg", "img/a4.jpg", "img/a.jpg",
    "img/a6.jpg", "img/a7.jpg", "img/a8.jpg", "img/a9.jpg", "img/a10.jpg",
    "img/a11.jpg", "img/a12.jpg", "img/a13.jpg", "img/a14.jpg", "img/a15.jpg",
    "img/a16.jpg", "img/a17.jpg", "img/a18.jpg", "img/a19.jpg", "img/a20.jpg",
    "img/a21.jpg", "img/a22.jpg", "img/a23.jpg", "img/a24.jpg", "img/a25.jpg",
    "img/a26.jpg", "img/a27.jpg", "img/a28.jpg", "img/a29.jpg", "img/a30.jpg"
  ];

  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");
  const albumBtn = document.getElementById("albumBtn");
  const typingDiv = document.getElementById("typing");

  let idx = 0;

  function type() {
    if (idx < message.length) {
      typingDiv.textContent += message[idx++];
      setTimeout(type, 50);
    } else {
      albumBtn.classList.add('visible');
    }
  }

  setTimeout(type, 1600);

  const heartColors = ['#ffb6c1', '#ffd1dc', '#ff69b4', '#ffc0cb', '#ff77aa'];

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.animationDelay = Math.random() * 10 + "s";
    heart.style.animationDuration = (7 + Math.random() * 8) + "s";
    document.body.appendChild(heart);
  }

  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    } else {
      music.pause();
      musicBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
  });

  function showConfetti() {
    const confettiColors = ['#ff6f91', '#ff9671', '#ffc75f', '#f9f871', '#ff3c78'];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      if (i % 2 === 0) confetti.classList.add('heart');

      confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      confetti.style.setProperty('--x', (Math.random() * 500 - 250) + 'px');
      confetti.style.setProperty('--y', (Math.random() * -500) + 'px');
      confetti.style.left = window.innerWidth / 2 + 'px';
      confetti.style.top = window.innerHeight / 2 + 'px';

      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1200);
    }
  }

  function showFirework() {
    const container = document.getElementById('fireworkContainer');
    container.innerHTML = '';
    container.style.opacity = 1;

    for (let i = 0; i < 30; i++) {
      const fw = document.createElement('div');
      fw.className = 'firework';
      fw.style.transform = `rotate(${i * 12}deg) translateY(-40px)`;
      container.appendChild(fw);
    }

    setTimeout(() => {
      container.style.opacity = 0;
    }, 1000);
  }

  albumBtn.addEventListener("click", () => {
    albumBtn.style.display = 'none';
    showConfetti();
    showFirework();

    setTimeout(() => {
      spawnHeartPhotosCentered();
    }, 500);
  });

  function createHeartPhotoCentered(idx, total) {
    const photo = document.createElement('img');
    photo.src = photoUrls[idx % photoUrls.length];
    photo.className = 'photo';
    document.body.appendChild(photo);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const t = Math.PI * 2 * (idx / total);
    const scale = (window.innerWidth <= 480) ? 14 : 22;

    const targetX = centerX + scale * 16 * Math.pow(Math.sin(t), 3);
    const targetY = centerY - scale * (
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    photo.style.left = centerX + 'px';
    photo.style.top = centerY + 'px';

    setTimeout(() => {
      photo.style.opacity = '1';
      photo.style.pointerEvents = 'auto';
      photo.style.transform = `translate(-50%, -50%) translate(${targetX - centerX}px, ${targetY - centerY}px)`;
    }, 100);
  }

  function spawnHeartPhotosCentered() {
    const totalPhotos = 30;

    for (let i = 0; i < totalPhotos; i++) {
      setTimeout(() => {
        createHeartPhotoCentered(i, totalPhotos);
      }, i * 100);
    }
  }
});