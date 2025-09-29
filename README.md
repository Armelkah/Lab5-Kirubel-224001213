## ReadMe File for Lab 5

# Web Application Development (WAD621S) Styling Lab - Lab 05

## Overview

This is a hands-on styling lab where you'll write CSS to style various UI components from scratch. The HTML structure is provided, but you need to implement all the styling yourself.

## Learning Objectives

By completing this lab, you will:

1. Practice writing CSS for modern web components
2. Learn to create consistent design systems
3. Understand responsive design principles
4. Implement interactive states (hover, active, focus)
5. Work with CSS variables for theming

## Getting Started

1. Fork/Clone the Repository to have it locally
2. Open the HTML file in a code editor (VS Code)
3. Examine the HTML structure of each component
4. Write CSS rules in the provided style file
5. Open the HTML file in a browser to see your results
6. Use developer tools to test and debug your styles

## Challenge Components

### 1. Cards
- Create cards with shadow effects
- Implement rounded corners
- Add hover effects with transitions
- Style card images and content areas

### 2. Buttons
- Create a primary button style
- Implement success, warning, and info variants
- Create an outline button style
- Add disabled state styling
- Style buttons with icons

### 3. Chips
- Create rounded filter chips
- Implement active state styling
- Style chips with icons
- Add close button styling

### 4. Navigation
- Create a horizontal navigation bar
- Style active state indicators
- Add hover effects
- Ensure proper spacing

### 5. Forms
- Style form labels and inputs
- Implement focus states
- Create consistent spacing
- Style textareas

### 6. Responsive Design
- Make the component grid responsive
- Implement mobile-friendly styles
- Use media queries effectively

### 7. Advanced: CSS Variables
- Implement a color system using CSS variables
- Create theme switching functionality
- Ensure consistent theming across components

## CSS Variables Provided

We've provided a set of CSS variables to help you maintain consistency:

```css
:root {
  --primary: #4361ee;
  --secondary: #3a0ca3;
  --success: #4cc9f0;
  --warning: #f72585;
  --info: #7209b7;
  --light: #f8f9fa;
  --dark: #212529;
  --gray: #6c757d;
  --light-gray: #e9ecef;
  --white: #ffffff;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
  --body-bg: #f5f7ff;
  --card-bg: #ffffff;
  --text-color: #212529;
  --border-color: #e9ecef;
}
```

## Tips for Success

1. **Start Simple**: Begin with basic styling before adding advanced effects
2. **Use Developer Tools**: Test and debug your styles in the browser
3. **Be Consistent**: Maintain consistent spacing, colors, and styles
4. **Test Responsiveness**: Check your styles at different screen sizes
5. **Reference Materials**: Use MDN Web Docs and other CSS references

## Evaluation Criteria

Your implementation will be evaluated on:

1. **Visual Design**: Attractive and modern appearance
2. **Consistency**: Uniform styling across components
3. **Functionality**: Proper hover states and interactions
4. **Responsiveness**: Works well on different screen sizes
5. **Code Quality**: Well-organized and efficient CSS

## Extension Challenges

If you finish early, try these additional challenges:

1. Add animations to component interactions
2. Implement a dark/light mode toggle
3. Create additional component variants
4. Add focus styles for accessibility
5. Optimize your CSS for performance

## Resources

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks Guides](https://css-tricks.com/guides/)
- [Google Fonts](https://fonts.google.com/)
- [Color Hunt](https://colorhunt.co/) for color palette inspiration

## Submission

Submit your completed HTML file with all CSS implemented on GitHub. Include a brief document explaining your design decisions and any challenges you faced.

Good luck, and have fun styling!