const AboutUs = () => {
    return (
      <section className="relative py-16">
        <div className="absolute pointer-events-none"></div>
        <div className="relative mx-auto text-center space-y-8">
          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            About <span className="text-blue-600">Marathon Management System</span>
          </h2>
          {/* Subtitle */}
          <p className="text-lg lg:text-xl dark:text-gray-400">
            Connecting runners and organizers for seamless marathon events. Our platform simplifies event management, making marathons accessible, organized, and rewarding for everyone.
          </p>
  
          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-xl font-semibold mb-4">🏃 Our Mission</h3>
              <p className="dark:text-gray-400">
                To streamline marathon event management by offering a comprehensive platform for race organizers and participants, ensuring a hassle-free experience.
              </p>
            </div>
  
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-xl font-semibold mb-4">🌍 Our Vision</h3>
              <p className="dark:text-gray-400">
                A world where every marathon enthusiast can easily participate in or organize a race, fostering a healthy and active community.
              </p>
            </div>
  
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-xl font-semibold mb-4">🤝 Our Values</h3>
              <p className="dark:text-gray-400">
                Fairness, accessibility, innovation, and community-driven support to encourage fitness and well-being through running events.
              </p>
            </div>
          </div>
  
          {/* Call to Action */}
          <div>
            <a
              href="/marathons"
              className="btn btn-outline text-gray-700 dark:text-white"
            >
              Discover Marathons
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  