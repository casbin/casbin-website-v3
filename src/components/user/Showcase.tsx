'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Plus, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Showcase() {
  const [users, setUsers] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/users.json')
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data.filter(Boolean) : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-16">
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {Array.from({ length: 18 }).map((_, idx) => (
            <Skeleton key={idx} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {users.map((user) => (
            <Card 
              key={user.caption} 
              className="group border-none shadow-none bg-muted/30 hover:bg-muted/50 transition-all duration-300"
            >
              <CardContent className="p-2">
                <a
                  href={user.infolink || user.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={user.caption}
                  className="flex items-center justify-center p-2 transition-all duration-500 opacity-80 hover:opacity-100 h-32"
                >
                  <img
                    src={`/images/${user.image}`}
                    alt={user.caption}
                    className="max-h-20 max-w-full object-contain"
                  />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <Card className="relative overflow-hidden border-none bg-gradient-to-br from-[#443D80] to-[#6B5B95] text-white">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
        <CardContent className="relative p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">Is your organization using Casbin?</h2>
          <p className="max-w-xl mx-auto text-white/80 text-lg">
            We&apos;d love to showcase your project here. Join the list of companies relying on Casbin for robust access control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <a
                href="https://github.com/casbin/casbin-website-v3/blob/master/public/data/users.json"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Plus className="h-5 w-5" />
                Add Your Organization
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent text-white border-white/30 hover:bg-white/10">
              <a
                href="https://github.com/casbin/casbin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}