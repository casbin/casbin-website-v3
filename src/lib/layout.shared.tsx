import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
<<<<<<< HEAD
      title: '',
      enabled: true,
      children: (
        <a href="/" className="flex items-center gap-2 font-semibold text-lg">
          <img 
            src="https://cdn.casbin.org/img/casbin_logo_1024x256.png" 
            alt="Casbin" 
            className="h-8 object-contain"
          />
        </a>
      ),
=======
      title: 'My App',
>>>>>>> afa4ddb (Initial commit from Create Fumadocs App)
    },
  };
}
