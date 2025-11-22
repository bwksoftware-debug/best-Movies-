import React from 'react';
import { Database, Globe, Server, ShieldCheck } from 'lucide-react';

export const SetupGuidePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">How to make this a Real App</h1>
        <p className="text-xl text-gray-400">
          Currently, this app runs in your browser using temporary memory. 
          Here is your step-by-step guide to adding a real Database and Domain.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Database Step */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <Database className="text-blue-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">1. Add Database</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>To save movies permanently, you need a backend. I recommend <strong>Supabase</strong> (free tier available).</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Go to <a href="https://supabase.com" target="_blank" className="text-blue-400 hover:underline">supabase.com</a> and create a project.</li>
              <li>Create a table called <code>movies</code> with columns: <code>id, title, description, url</code>.</li>
              <li>In this React code, install the client: <code>npm install @supabase/supabase-js</code>.</li>
              <li>Replace the local <code>movies</code> state in <code>App.tsx</code> with Supabase `select()` and `insert()` calls.</li>
            </ol>
          </div>
        </div>

        {/* Domain Step */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <Globe className="text-green-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">2. Get Domain & Hosting</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>To make the site public at <strong>bestMovies.com</strong>:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Buy your domain from <strong>Namecheap</strong> or <strong>GoDaddy</strong>.</li>
              <li>Deploy this code to <strong>Vercel</strong> (it's free for frontends).</li>
              <li>In Vercel settings, go to "Domains" and add your custom domain.</li>
              <li>Update your domain's DNS settings to point to Vercel.</li>
            </ol>
          </div>
        </div>

         {/* Storage Step */}
         <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <Server className="text-purple-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">3. Video Storage</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>Hosting video files is expensive. Do not store MP4s in the Git repo.</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Easy Way:</strong> Upload videos to YouTube (Unlisted) or Google Drive and copy the link.</li>
              <li><strong>Pro Way:</strong> Use AWS S3 or Cloudflare R2 for cheap object storage.</li>
              <li>Update the <code>videoUrl</code> field in your database to point to these cloud links.</li>
            </ul>
          </div>
        </div>

        {/* Auth Step */}
         <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-600/20 rounded-lg">
              <ShieldCheck className="text-red-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">4. Authentication</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>Currently, anyone can upload. To secure it:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Enable <strong>Supabase Auth</strong> (Google/Email login).</li>
              <li>Add Row Level Security (RLS) policies in Supabase so only logged-in users can `INSERT` into the `movies` table.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};