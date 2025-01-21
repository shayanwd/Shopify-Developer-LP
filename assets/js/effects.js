// MATTER HOGYA MATTER HOGYA
const { Engine, Render, Bodies, World, Query, Body } = Matter;

const sectionTag = document.querySelector("section.shapes");

// Width and height of the page
let w = sectionTag.clientWidth;
let h = sectionTag.clientHeight;

// Create Matter.js engine and renderer
const engine = Engine.create();

const renderer = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        width: w,
        height: h,
        background: "#2C2C2C",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
    },
});

// Function to create a shape with SVG texture
const createShape = function (x, y) {
    return Bodies.rectangle(x, y, 30, 30, { // Size of the shapes
        frictionAir: 0.01,
        density: 0.0006, // Lightweight for smooth repelling
        restitution: 0.9, // Add slight bounce effect
        render: {
            sprite: {
                texture: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 27' width='27' height='27'%3E%3Crect x='0' y='0' width='21' height='21' fill='%2396BF48' fill-opacity='0.57'/%3E%3C/svg%3E",
            },
        },
    });
};

// Create walls for shapes to bounce off
const wallOptions = {
    isStatic: true,
    render: {
        visible: false,
    },
};

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 110, wallOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

// Generate random shapes
const generateShapes = function (count) {
    const shapes = [];
    for (let i = 0; i < count; i++) {
        const randomX = Math.random() * w; // Random X position
        const randomY = Math.random() * h; // Random Y position
        shapes.push(createShape(randomX, randomY));
    }
    return shapes;
};

const shapes = generateShapes(120); // Increase the number of shapes dynamically

World.add(engine.world, [
    ground,
    ceiling,
    leftWall,
    rightWall,
    ...shapes,
]);

// Add repelling effect on mousemove
sectionTag.addEventListener("mousemove", function (event) {
    const mousePosition = { x: event.x, y: event.y - sectionTag.getBoundingClientRect().top };
    const hoveredShapes = Query.point(shapes, mousePosition);

    hoveredShapes.forEach((shape) => {
        // Calculate the force direction (away from the mouse pointer)
        const forceMagnitude = 0.003; // Increased for a noticeable effect
        const force = {
            x: (shape.position.x - mousePosition.x) * forceMagnitude,
            y: (shape.position.y - mousePosition.y) * forceMagnitude,
        };

        // Apply the force to the shape
        Body.applyForce(shape, shape.position, force);
    });
});

// Run Matter.js engine and renderer
Engine.run(engine);
Render.run(renderer);

// Update canvas size on window resize
window.addEventListener("resize", function () {
    w = sectionTag.clientWidth;
    h = sectionTag.clientHeight;

    renderer.options.width = w;
    renderer.options.height = h;
});










particlesJS("particles-js", { "particles": { "number": { "value": 81, "density": { "enable": true, "value_area": 718.0870161888723 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 3 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.1994686156080201, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 11.968116936481206, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 4.03808723883671, "sync": false } }, "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.07978744624320804, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 266.5137577632229, "size": 12.114261716510132, "duration": 2, "opacity": 0.1857520129864887, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }); var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function () { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
























