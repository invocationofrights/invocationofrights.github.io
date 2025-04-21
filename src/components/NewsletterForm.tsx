// src/components/NewsletterForm.tsx
'use client';

import React, {useState} from 'react';
import {SITE} from "@/config/site";

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const url = SITE.EMAIL_COLLECTION;
    const query = new URLSearchParams([...formData.entries()] as [string, string][]).toString();

    try {
      await fetch(`${url}?${query}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      // Since JSONP doesn’t give us a clean response, we assume success
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md">
      {status === 'success' ? (
        <div className="
  border border-success
  text-success-fg dark:text-success-dark-fg
  bg-success-bg dark:bg-success-dark-bg
  px-4 py-3 rounded-md
">
          <strong>Thank you!</strong> You’ve been added to the list.
        </div>

      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="ml-email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            type="email"
            id="ml-email"
            name="fields[email]"
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
          <input type="hidden" name="ml-submit" value="1"/>
          <input type="hidden" name="anticsrf" value="true"/>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            data-analytics="newsletter_signup"
          >
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
          </button>

          {status === 'error' && (
            <p className="text-sm text-red-600">Something went wrong. Please try again later.</p>
          )}
        </form>
      )}
    </div>
  );
}
