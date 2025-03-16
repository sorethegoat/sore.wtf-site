function fairyDustCursor(options) {
  let possibleColors = (options && options.colors) || ["#ffffff"];
  let hasWrapperEl = options && options.element;
  let element = hasWrapperEl || document.body;

  let width = window.innerWidth;
  let height = window.innerHeight;
  const cursor = { x: width / 2, y: height / 2 };
  const lastPos = { x: width / 2, y: height / 2 };
  const particles = [];
  const canvImages = [];
  let canvas, context, animationFrame;

  const char = "*";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  prefersReducedMotion.onchange = () => {
    if (prefersReducedMotion.matches) {
      destroy();
    } else {
      init();
    }
  };

  function init() {
    if (prefersReducedMotion.matches) {
      console.log(
        "This browser has prefers reduced motion turned on, so the cursor did not init"
      );
      return false;
    }

    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.pointerEvents = "none";

    canvas.style.position = "fixed";
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;

    context.font = "21px serif";
    context.textBaseline = "middle";
    context.textAlign = "center";

    possibleColors.forEach((color) => {
      let measurements = context.measureText(char);
      let bgCanvas = document.createElement("canvas");
      let bgContext = bgCanvas.getContext("2d");

      bgCanvas.width = measurements.width;
      bgCanvas.height =
        measurements.actualBoundingBoxAscent +
        measurements.actualBoundingBoxDescent;

      bgContext.fillStyle = color;
      bgContext.textAlign = "center";
      bgContext.font = "21px serif";
      bgContext.textBaseline = "middle";
      bgContext.fillText(
        char,
        bgCanvas.width / 2,
        measurements.actualBoundingBoxAscent
      );

      canvImages.push(bgCanvas);
    });

    bindEvents();
    loop();
  }

  function bindEvents() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        addParticle(
          e.touches[i].clientX,
          e.touches[i].clientY,
          canvImages[Math.floor(Math.random() * canvImages.length)]
        );
      }
    }
  }

  function onMouseMove(e) {
    window.requestAnimationFrame(() => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;

      const distBetweenPoints = Math.hypot(
        cursor.x - lastPos.x,
        cursor.y - lastPos.y
      );

      if (distBetweenPoints > 1.5) {
        addParticle(
          cursor.x,
          cursor.y,
          canvImages[Math.floor(Math.random() * possibleColors.length)]
        );

        lastPos.x = cursor.x;
        lastPos.y = cursor.y;
      }
    });
  }

  function addParticle(x, y, color) {
    particles.push(new Particle(x, y, color));
  }

  function updateParticles() {
    if (particles.length == 0) {
      return;
    }

    context.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update(context);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) {
        particles.splice(i, 1);
      }
    }

    if (particles.length == 0) {
      context.clearRect(0, 0, width, height);
    }
  }

  function loop() {
    updateParticles();
    animationFrame = requestAnimationFrame(loop);
  }

  function destroy() {
    canvas.remove();
    cancelAnimationFrame(animationFrame);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchstart", onTouchMove);
    window.removeEventListener("resize", onWindowResize);
  }

  function Particle(x, y, canvasItem) {
    const lifeSpan = Math.floor(Math.random() * 30 + 60);
    this.initialLifeSpan = lifeSpan;
    this.lifeSpan = lifeSpan; //ms
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: Math.random() * 0.7 + 0.9,
    };
    this.position = { x: x, y: y };
    this.canv = canvasItem;

    this.update = function (context) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;

      this.velocity.y += 0.02;

      const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

      context.drawImage(
        this.canv,
        this.position.x - (this.canv.width / 2) * scale,
        this.position.y - this.canv.height / 2,
        this.canv.width * scale,
        this.canv.height * scale
      );
    };
  }

  init();

  return {
    destroy: destroy,
  };
}

fairyDustCursor();