AFRAME.registerComponent("create-ball", {
  schema: {},

  init: function () {
    // Do something when component first attached.
    this.throwBall();
  },

  throwBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "v") {
        var ball = document.createElement("a-entity");

        ball.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.3,
        });

        ball.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });
        ball.setAttribute("dynamic-body", {
          mass: 0,
        });

        ball.addEventListener("collide", this.removeBullet);

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        ball.setAttribute("velocity", direction.multiplyScalar(-20));

        ball.setAttribute("dynamic-body", { mass: 0 });

        var scene = document.querySelector("#scene");

        scene.appendChild(ball);
      }
    });
  },

  removeBullet: function (e) {
    console.log("Hit");
    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    var cam = document.querySelector("#camera").object3D;
    var direction = new THREE.Vector3();
    cam.getWorldDirection(direction);

    if (elementHit.id.includes("target")) {
      pos = element.getAttribute("position");
      rot = element.getAttribute("rotation");
      scl = element.getAttribute("scale");

      ranImg = Math.floor(Math.random() * 6) + 1;

      var imgEl = document.createElement("a-image");
      imgEl.setAttribute("position", {
        x: -1 * direction.x,
        y: pos.y - 1,
        z: -1 * (pos.z + 5),
      });
      imgEl.setAttribute("rotation", { rot });

      imgEl.setAttribute("src", "./Images/img" + ranImg + ".png");
      imgEl.setAttribute("width", 0.15);
      imgEl.setAttribute("height", 0.25);
      imgEl.setAttribute("id", "img" + ranImg);

      elementHit.appendChild(imgEl);
    }

    //remove event listener
    element.removeEventListener("collide", this.removeBullet);

    //remove the bullets from the scene
    var scene = document.querySelector("#scene");
    scene.removeChild(element);
  },
});
