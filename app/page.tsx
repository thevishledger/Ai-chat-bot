"use client";
import { generateTextAction } from "@/app/actions/aiAction";
import { useState } from "react";
import ReactMarkDown from "react-markdown";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendPrompt = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setOutput("");
    try {
      const response = await generateTextAction(prompt);
      setOutput(response);
    } catch (err) {
      setOutput("Try again after some time.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col bg-black text-white">
      <section className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto w-full max-w-3xl">
          {!output && !loading && (
            <div className="flex h-full min-h-[60vh] flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold">Start your chat</h2>
              <p className="mt-2 text-neutral-500">ask your question below</p>
            </div>
          )}

          {output && (
            <>
              <h1 className="mb-4 text-2xl font-bold font-serif">
                {" "}
                AI RESPONSE:
              </h1>
              <ReactMarkDown
                components={{
                  p: ({ children }) => (
                    <p className="mb-3 leading-relaxed">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h2 className="mb-2 mt-4 text-xl font-bold">{children}</h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-2 mt-4 text-xl font-semibold">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-4 text-lg font-semibold">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-3 list-disc pl-6">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-3 list-decimal pl-6">{children}</ol>
                  ),
                  pre: ({ children }) => (
                    <pre className="my-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm">
                      {children}
                    </pre>
                  ),
                  code: ({ children }) => (
                    <code className="font-mono text-emerald-300">
                      {children}
                    </code>
                  ),
                }}
              >
                {output}
              </ReactMarkDown>
            </>
          )}
        </div>
      </section>

      <footer className="border-t border-neutral-800 bg-black px-6 py-4">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          <input
            className="flex-1 rounded-md border border-neutral-700 bg-transparent p-2 outline-none"
            placeholder="Search"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
          />
          <button
            onClick={handleSendPrompt}
            disabled={loading}
            className="w-[20%] cursor-pointer rounded-md bg-neutral-700 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>
      </footer>
    </main>
  );
}
