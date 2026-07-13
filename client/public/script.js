const canvas = document.getElementById("video-scrub-canvas");
const context = canvas.getContext("2d");
const triggerZone = document.querySelector(".animation-trigger-zone");

const TOTAL_FRAMES = 266;
const imageCache = [];


const storyTimeline = [
    {
        start: 1,
        end: 25,
        tag: "EXTERIOR SEQUENCE",
        title: "Dive into the beautiful exterior and interior structural frameworks.",
        targetUrl: "exterior-details.html"
    },
    {
        start: 26,
        end: 71,
        tag: "THE GRAND ENTRANCE",
        title: "Transitioning smoothly into minimal design orientations.",
        targetUrl: "entrance-details.html"
    },
    {
        start: 72,
        end: 127,
        tag: "SITTING AREA",
        title: "The sunken lounge: Seamless luxury comfort meets calculated geometry.",
        targetUrl: "lounge-details.html"
    },
    {
        start: 128,
        end: 183,
        tag: "CULINARY ZONE",
        title: "The kitchen layout configured with monolithic stone elements.",
        targetUrl: "kitchen-details.html"
    },
    {
        start: 184,
        end: 224,
        tag: "MASTER BEDROOM",
        title: "The private sanctuary optimized for absolute rest and tranquility.",
        targetUrl: "bedroom-details.html"
    },
    {
        start: 225,
        end: 266,
        tag: "THE TERRACE VISTA",
        title: "Frameless glass physical boundaries facing panoramic nature views.",
        targetUrl: "terrace-details.html"
    }
];

let lastActiveIndex = -1;

const updateStoryText = (frameIndex) => {
    const overlayZone = document.getElementById("cinematic-text-overlay");
    const tagEl = document.getElementById("cinematic-tag");
    const titleEl = document.getElementById("cinematic-title");
    const buttonEl = document.getElementById("explore-section-btn");

    const activeStoryIndex = storyTimeline.findIndex(
        story => frameIndex >= story.start && frameIndex <= story.end
    );

    if (activeStoryIndex === -1) {
        overlayZone.className = "text-zone-hidden";
        lastActiveIndex = -1;
        return;
    }

    if (activeStoryIndex === lastActiveIndex) return;
    lastActiveIndex = activeStoryIndex;

    const currentStory = storyTimeline[activeStoryIndex];
    
    overlayZone.className = "text-zone-hidden";
    
    setTimeout(() => {
        tagEl.innerText = currentStory.tag;
        titleEl.innerText = currentStory.title;
        buttonEl.setAttribute("href", currentStory.targetUrl); 
        overlayZone.className = "text-zone-visible";
    }, 250); 
};


const getFramePath = (index) => {
    const paddedIndex = String(index).padStart(3, '0');
    return `../public/assets/frames/frame_${paddedIndex}.jpg`;
};

const preloadFrames = () => {
    let loadedCount = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
            loadedCount++;
            if (loadedCount === TOTAL_FRAMES) {
                renderFrame(1);
            }
        };
        imageCache.push(img);
    }
};

const renderFrame = (index) => {
    const targetImage = imageCache[index - 1];
    if (!targetImage) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imageRatio = targetImage.width / targetImage.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imageRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
    } else {
        drawWidth = canvas.height * imageRatio;
        drawHeight = canvas.height;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(targetImage, drawX, drawY, drawWidth, drawHeight);
};

window.addEventListener("scroll", () => {
    const triggerTop = triggerZone.offsetTop;
    const triggerHeight = triggerZone.offsetHeight - window.innerHeight;
    const scrollTop = window.scrollY;

    if (scrollTop < triggerTop) {
        renderFrame(1);
        document.getElementById("cinematic-text-overlay").className = "text-zone-hidden";
        lastActiveIndex = -1;
        return;
    }

    const zoneScrollTop = scrollTop - triggerTop;
    const scrollFraction = Math.min(1, Math.max(0, zoneScrollTop / triggerHeight));
    const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.ceil(scrollFraction * TOTAL_FRAMES)));

    requestAnimationFrame(() => {
        renderFrame(frameIndex);
        updateStoryText(frameIndex);
    });
});


preloadFrames();