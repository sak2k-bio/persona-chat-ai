# 🤝 Contributing to Persona Chat App

Thank you for your interest in contributing to the Persona Chat App! This document provides guidelines and information for contributors.

## 🎯 Project Overview

Persona Chat App is a Next.js application that allows users to chat with AI personas based on real tech educators. The app features:

- **Hitesh Choudhary**: Seasoned developer and educator with Hinglish communication style
- **Piyush Garg**: Passionate software engineer with energetic teaching approach
- Real-time chat interface with persistent storage
- Integration with Google Gemini API and Supabase

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Local Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/persona-chat-app.git
   cd persona-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
persona-chat-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── components/        # React components
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   └── types/                 # TypeScript definitions
├── prompts.json               # Persona definitions
├── database-setup.sql         # Database schema
└── docs/                      # Documentation
```

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any` types
- **React**: Use functional components with hooks
- **Naming**: Use descriptive names, follow camelCase for variables
- **Comments**: Add JSDoc comments for complex functions
- **Error Handling**: Implement proper error boundaries and fallbacks

### Component Guidelines

- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error handling
- Add loading states where appropriate
- Make components accessible (ARIA labels, keyboard navigation)

### API Guidelines

- Use proper HTTP status codes
- Implement input validation
- Add comprehensive error handling
- Use environment variables for sensitive data
- Add rate limiting for production

## 🎨 Adding New Personas

To add a new AI persona:

1. **Update `prompts.json`**
   ```json
   {
     "name": "New Persona Name",
     "role": "Brief Role Description",
     "description": "User-facing description",
     "content": "Detailed system prompt for AI behavior",
     "avatar": "/avatars/persona.jpg",
     "color": "bg-color-600"
   }
   ```

2. **Add avatar image** to `public/avatars/`

3. **Update PersonaSelector component** if needed

4. **Test the persona** thoroughly

### Persona Guidelines

- **Authentic**: Base personas on real people or well-defined characters
- **Consistent**: Maintain consistent communication style
- **Educational**: Focus on providing value to users
- **Cultural**: Respect cultural sensitivities and diversity

## 🧪 Testing

### Manual Testing

- Test on different devices and screen sizes
- Verify all API endpoints work correctly
- Test error scenarios and edge cases
- Check accessibility features

### Automated Testing

- Run linting: `npm run lint`
- Run type checking: `npm run type-check`
- Run build: `npm run build`

## 📝 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex business logic
- Update README.md for new features
- Keep API documentation current

### User Documentation

- Update setup instructions
- Document new features
- Provide troubleshooting guides
- Keep screenshots current

## 🚀 Deployment

### Environment Variables

Ensure these are set in production:
- `GEMINI_API_KEY`: Google Gemini API key
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key

### Build Process

```bash
npm run build
npm start
```

## 🐛 Bug Reports

When reporting bugs:

1. **Use the issue template**
2. **Describe the problem clearly**
3. **Include steps to reproduce**
4. **Add screenshots if relevant**
5. **Specify your environment**

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., 18.17.0]

## Additional Information
Any other context or screenshots
```

## 💡 Feature Requests

When requesting features:

1. **Describe the feature clearly**
2. **Explain the use case**
3. **Consider implementation complexity**
4. **Discuss alternatives**

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Follow coding guidelines
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Create a Pull Request**
   - Use the PR template
   - Describe changes clearly
   - Link related issues

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] All tests pass
- [ ] No console errors

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 📋 Code Review Process

- All PRs require review
- Address review comments promptly
- Keep discussions constructive
- Be open to feedback and suggestions

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📞 Getting Help

- **Issues**: [GitHub Issues](https://github.com/yourusername/persona-chat-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/persona-chat-app/discussions)
- **Documentation**: Check the project wiki

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Persona Chat App! 🎉**

*"Chai ke saath coding seekhte hain!" - Hitesh Choudhary*
*"I build devs, not just apps!" - Piyush Garg*
