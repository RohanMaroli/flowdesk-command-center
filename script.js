
// Simple JavaScript to add interactivity

document.addEventListener('DOMContentLoaded', function() {
  // Get all team cards
  const teamCards = document.querySelectorAll('.team-card');
  
  // Add click event to team cards
  teamCards.forEach(card => {
    card.addEventListener('click', function() {
      // For now, just log which team was clicked
      // In a real application, this would navigate to a team detail page
      const teamName = this.querySelector('h3').textContent;
      console.log(`${teamName} team card clicked`);
      
      // Animation effect on click
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });
  
  // Navigation menu active state
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
    });
  });
  
  // User profile button
  const userButton = document.querySelector('.user-button');
  userButton.addEventListener('click', function() {
    console.log('User profile button clicked');
    // Here you would typically show a dropdown menu or navigate to profile page
  });
});
