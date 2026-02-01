import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Github, Users2, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Help",
  description: "Get help with Casbin",
};

export default function HelpPage() {
  const helpOptions = [
    {
      icon: MessageSquare,
      title: "Discord",
      description: "Join the conversation on Discord to get help from contributors.",
      link: "https://discord.gg/S5UjpzGZjN",
      color: "text-[#5865F2]",
      bgColor: "bg-[#5865F2]/10",
    },
    {
      icon: Github,
      title: "GitHub",
      description:
        "Browse our GitHub repo and submit issues or pull requests for bugs or feature requests.",
      link: "https://github.com/casbin/casbin",
      color: "text-gray-900 dark:text-white",
      bgColor: "bg-gray-900/10 dark:bg-white/10",
    },
    {
      icon: Users2,
      title: "Google Groups",
      description:
        "Discuss with maintainers or share your experience with Casbin on Google Groups.",
      link: "https://groups.google.com/g/casbin",
      color: "text-[#4285F4]",
      bgColor: "bg-[#4285F4]/10",
    },
    {
      icon: HelpCircle,
      title: "Stack Overflow",
      description: "Ask questions about Casbin on Stack Overflow.",
      link: "https://stackoverflow.com/questions/tagged/casbin",
      color: "text-[#F48024]",
      bgColor: "bg-[#F48024]/10",
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#443D80] to-[#6B5B95] bg-clip-text text-transparent">
            Need Help?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            If you need help with Casbin, try one of these options.
          </p>
        </div>

        {/* Help Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {helpOptions.map((option) => {
            const Icon = option.icon;
            return (
              <a
                key={option.title}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-[#443D80]/50">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`p-3 rounded-lg ${option.bgColor}`}>
                        <Icon className={`h-6 w-6 ${option.color}`} />
                      </div>
                      <CardTitle className="text-xl group-hover:text-[#443D80] transition-colors">
                        {option.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {option.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-slate-50 dark:bg-slate-800 rounded-lg px-6 py-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Looking for documentation?{" "}
              <Link href="/docs" className="text-[#443D80] hover:underline font-medium">
                Visit our docs
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
