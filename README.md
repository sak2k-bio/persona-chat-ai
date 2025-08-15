# 🚀 Persona Chat AI App - AI Mentors Edition

A beautiful Next.js chat application featuring two legendary Indian tech educators: **Hitesh Choudhary** and **Piyush Garg**. Chat with these AI mentors to get personalized programming guidance, tech advice, and coding insights in their authentic styles.

![alt text](https://github.com/sak2k-bio/persona-chat-ai/blob/fe657fc7d5e399c854caec1ec576f02a7dd73510/public/assets/how_it_looks.png)

## ✨ Features

- **🤖 Dual AI Mentors**: Chat with Hitesh Choudhary or Piyush Garg
- **🎭 Authentic Personalities**: Each mentor responds in their unique style and tone
- **💬 Real-time Chat**: Interactive conversation interface with message history
- **☕ Hinglish Communication**: Natural blend of Hindi and English for Indian users
- **💾 Persistent Storage**: All conversations saved in Supabase database
- **🎨 Beautiful UI**: Modern, responsive design with Tailwind CSS
- **📱 Mobile Friendly**: Optimized for all device sizes
- **🔒 Secure**: API keys and secrets kept secure in environment variables

## 🎯 Meet Your AI Mentors

### **Hitesh Choudhary** 🧠☕
- **Role**: Seasoned Developer & Educator (15+ years experience)
- **Style**: Hinglish master with chai motif, warm and encouraging
- **Teaching**: "No-spoon-feeding" approach, guidance over solutions
- **Expertise**: Full-stack development, cybersecurity, AI/ML, system design
- **Background**: Founder of LCO, Chaicode, 1500+ videos, TED speaker

### **Piyush Garg** 🚀💻
- **Role**: Passionate Software Engineer & Educator
- **Style**: Energetic Hinglish with emojis, "I build devs, not just apps"
- **Teaching**: Hands-on, project-based, community-focused learning
- **Expertise**: MERN stack, AWS, DevOps, mobile development
- **Background**: 5+ years experience, 287K+ YouTube subscribers, Chaicode educator

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **AI**: Google Gemini API (Gemini 1.5 Flash)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for future implementation)
- **Deployment**: Vercel, Netlify, or any Node.js hosting

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key
- Supabase account and project

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/persona-chat-app.git
cd persona-chat-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Database Setup
Run the SQL commands from `database-setup.sql` in your Supabase SQL Editor to create the required tables.

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## 🗄️ Database Schema

The app uses a simple but effective schema:

```sql
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  prompt_name TEXT NOT NULL,
  history JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 📁 Project Structure

```
persona-chat-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── prompts/route.ts          # Serve available personas
│   │   │   └── chat/
│   │   │       ├── create/route.ts       # Create new chat sessions
│   │   │       └── [chat_id]/message/route.ts  # Handle chat messages
│   │   ├── components/
│   │   │   ├── PersonaSelector.tsx       # Persona selection interface
│   │   │   └── ChatInterface.tsx         # Chat conversation interface
│   │   ├── globals.css                   # Global styles
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Main page component
│   └── types/                            # TypeScript type definitions
├── prompts.json                           # Persona definitions
├── database-setup.sql                     # Database initialization
├── .env.local                             # Environment variables (not in git)
├── package.json                           # Dependencies and scripts
└── README.md                              # This file
```

## 🔌 API Endpoints

### `GET /api/prompts`
Returns the list of available AI personas.

### `POST /api/chat/create`
Creates a new chat session with the selected persona.

**Request Body:**
```json
{
  "prompt_name": "Hitesh Choudhary"
}
```

**Response:**
```json
{
  "chatId": "uuid-here",
  "prompt_name": "Hitesh Choudhary"
}
```

### `POST /api/chat/[chat_id]/message`
Sends a message and receives an AI response.

**Request Body:**
```json
{
  "userMessage": "How do I learn React?"
}
```

**Response:**
```json
{
  "assistantReply": "AI mentor's response here..."
}
```

## 🎨 Customization

### Adding New Personas
1. Add a new entry to `prompts.json`
2. Include name, role, description, content (system prompt), avatar, and color
3. The app will automatically detect and display new personas

### Styling
- Modify `src/app/globals.css` for global styles
- Update component-specific styles in their respective files
- Use Tailwind CSS classes for consistent design

### AI Model
- Currently uses Google Gemini 1.5 Flash
- Can be easily modified to use other AI providers
- Update the `sendPromptToGemini` function in the message route

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder
3. Configure environment variables

### Other Platforms
The app works on any Node.js hosting platform. Just ensure:
- Environment variables are properly set
- Database connection is accessible
- API routes are properly configured

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Primary Google Gemini API key | Yes |
| `GEMINI_API_KEY_2` | Secondary Gemini API key for fallback | No |
| `GEMINI_API_KEY_3` | Tertiary Gemini API key for fallback | No |
| `GEMINI_API_KEY_4` | Quaternary Gemini API key for fallback | No |
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `GEMINI_MODEL` | Gemini model to use (default: gemini-1.5-flash) | No |

### 🔑 **API Key Fallback System**

The app now supports up to **4 Gemini API keys** for automatic fallback:

1. **Primary Key** (`GEMINI_API_KEY`) - Main API key
2. **Secondary Key** (`GEMINI_API_KEY_2`) - First fallback
3. **Tertiary Key** (`GEMINI_API_KEY_3`) - Second fallback  
4. **Quaternary Key** (`GEMINI_API_KEY_4`) - Third fallback

**How it works:**
- When one key gets overloaded (503) or rate-limited (429), the app automatically switches to the next available key
- If all keys are overloaded, the app provides a fallback response
- Keys are automatically marked as available again after successful requests
- No user intervention required - seamless fallback experience

## 🐛 Troubleshooting

### Common Issues

**1. Gemini API Errors**
- Check if your API key is valid
- Ensure you have sufficient quota
- The app includes fallback responses for API outages

**2. Supabase Connection Issues**
- Verify your Supabase URL and keys
- Check if your database is accessible
- Ensure the `chat_sessions` table exists

**3. Build Errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set

### Error Handling
The app includes comprehensive error handling:
- API rate limiting and overload protection
- Network error fallbacks
- User-friendly error messages
- Graceful degradation during service outages

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hitesh Choudhary** - For inspiring the educator persona and teaching philosophy
- **Piyush Garg** - For the energetic developer mentor approach
- **Next.js Team** - For the amazing framework
- **Supabase** - For the excellent backend-as-a-service
- **Google Gemini** - For the powerful AI capabilities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/persona-chat-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/persona-chat-app/discussions)
- **Documentation**: [Project Wiki](https://github.com/yourusername/persona-chat-app/wiki)

---

**Made with ❤️ for the Indian developer community**

*"Chai ke saath coding seekhte hain!" - Hitesh Choudhary*
*"I build devs, not just apps!" - Piyush Garg*
