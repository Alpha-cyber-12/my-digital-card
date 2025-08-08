import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

// Generative Art Background Component using p5.js
const LiquidBackground = () => {
  const containerRef = useRef(null);
  const sketchRef = useRef(null);

  useEffect(() => {
    // Only create one instance of p5.js
    if (sketchRef.current) return;

    const sketch = (p) => {
      let blobs = [];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.noiseSeed(p.random(100));
        p.colorMode(p.HSB, 255);

        for (let i = 0; i < 5; i++) {
          blobs.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(200, 400),
            speedX: p.random(-0.3, 0.3),
            speedY: p.random(-0.3, 0.3),
            hue: p.random(180, 240), // Shades of blue
            saturation: 200,
            brightness: 200,
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 10, 50); // Semi-transparent black background for trails
        p.noStroke();

        for (let blob of blobs) {
          blob.x += blob.speedX;
          blob.y += blob.speedY;

          // Wrap around edges
          if (blob.x > p.width) blob.x = 0;
          if (blob.x < 0) blob.x = p.width;
          if (blob.y > p.height) blob.y = 0;
          if (blob.y < 0) blob.y = p.height;

          // Follow mouse with a slight lag
          const dx = p.mouseX - blob.x;
          const dy = p.mouseY - blob.y;
          blob.speedX += dx * 0.0005;
          blob.speedY += dy * 0.0005;

          // Add a gentle "wobble" using Perlin noise
          blob.x += p.noise(p.frameCount * 0.005, blob.x * 0.01) * 2 - 1;
          blob.y += p.noise(p.frameCount * 0.005, blob.y * 0.01) * 2 - 1;

          p.fill(blob.hue, blob.saturation, blob.brightness, 100);
          p.ellipse(blob.x, blob.y, blob.size);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    sketchRef.current = new p5(sketch, containerRef.current);

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
        sketchRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} id="p5-container" className="absolute inset-0 z-0" />;
};


// Main App Component
const App = () => {
  const [isHoveringName, setIsHoveringName] = useState(false);

  const companyData = {
    companyName: 'S.K ENTERPRISES',
    personName: 'VIKAS AGARWAL',
    title: 'Proprietor',
    bio: "Dedicated business owner committed to excellence and strategic growth. Let's connect and build something great.",
    logoUrl: "https://placehold.co/112x112/0c0c1b/e0e0e0?text=SKE"
  };

  const contactData = [
    {
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 4.99-8-4.99V6h16zm-16 12V9.489l7.447 4.654a.996.996 0 001.106 0L20 9.489V18H4z"></path></svg>,
      text: 'Vikasagarwal183@gmail.com',
      link: 'mailto:Vikasagarwal183@gmail.com'
    },
    {
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.088 15.088 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.2.48 2.5.74 3.86.74a1 1 0 011 1v3.5a1 1 0 01-1 1C7.92 21.41 2.59 16.08 2.59 9a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.26 2.66.73 3.79a1 1 0 01-.2 1.11l-2.2 2.2z"></path></svg>,
      text: '+91 9811107598',
      link: 'https://wa.me/919811107598'
    },
    {
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 3.75 5 11 7 13 2-2 7-9.25 7-13 0-3.87-3.13-7-7-7zM12 11.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"></path></svg>,
      text: 'B-2/50, D.S.I.D.C. Industrial Compound, Jhilmil Industrial Area, Delhi - 110095',
      link: 'https://maps.app.goo.gl/SVDhW8gztXa4kYAz5'
    },
  ];

  const handleDownload = () => {
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${companyData.personName}
N:${companyData.personName.split(' ')[1]};${companyData.personName.split(' ')[0]};;;
ORG:${companyData.companyName}
TITLE:${companyData.title}
EMAIL;TYPE=INTERNET:${contactData[0].text}
TEL;TYPE=CELL,VOICE:${contactData[1].text}
ADR;TYPE=WORK:;;${contactData[2].text};;;;
END:VCARD`;

    const blob = new Blob([vCardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyData.personName.replace(/\s/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 bg-gray-950">
      <LiquidBackground />

      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-center text-center md:text-left">
        {/* Main Card */}
        <div className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-xl p-8 md:p-12 transform transition-all duration-300 hover:scale-[1.02] w-full md:w-1/2">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start mb-6">
            <img src={companyData.logoUrl} alt={`${companyData.companyName} Logo`} className="w-24 h-24 mb-4 rounded-full border-4 border-gray-700 shadow-lg" />
            <h2 className="text-3xl font-bold text-gray-100">{companyData.companyName}</h2>
          </div>
          <hr className="w-full border-gray-700 my-6" />
          {/* Personal Info */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-5xl font-extrabold text-white leading-tight uppercase">{companyData.personName}</h1>
            <p className="text-lg text-blue-400 uppercase mt-2">{companyData.title}</p>
          </div>
          <p className="text-gray-300 mt-6 max-w-sm mx-auto md:mx-0">{companyData.bio}</p>
        </div>

        {/* Contact Info */}
        <div className="relative z-10 mt-8 md:mt-0 md:ml-12 space-y-4 w-full md:w-1/2 text-left">
          {contactData.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="text-blue-400 flex-shrink-0">{item.icon}</span>
              {item.link ? (
                <a href={item.link} className="text-gray-300 hover:text-blue-400 transition-colors duration-200">{item.text}</a>
              ) : (
                <span className="text-gray-300">{item.text}</span>
              )}
            </div>
          ))}
          <button onClick={handleDownload} className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105">
            Download Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
```css
body {
  font-family: 'Lato', sans-serif;
}

h1, h2 {
  font-family: 'Cormorant Garamond', serif;
}
