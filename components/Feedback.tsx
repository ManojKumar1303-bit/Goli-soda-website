
import React, { useState } from 'react';
import { FLAVORS, CONTACT_INFO } from '../constants';

interface BuzzItem {
  id: string;
  type: 'review' | 'news';
  title: string;
  content: string;
  author?: string;
  date: string;
}

const LATEST_BUZZ: BuzzItem[] = [
  { 
    id: 'n1', 
    type: 'news', 
    title: 'New Distribution Hub!', 
    content: 'We are now delivering fresh batches daily to the Saravanampatti area in Coimbatore.', 
    date: 'Oct 24' 
  },
  { 
    id: 'r1', 
    type: 'review', 
    title: '5 Stars', 
    author: 'Karthik Raja', 
    content: 'The best Panner Soda in Karur! Reminds me of the local festivals near the bridge.', 
    date: 'Oct 22' 
  },
  { 
    id: 'r2', 
    type: 'review', 
    title: 'Refreshing!', 
    author: 'Selvi M.', 
    content: 'Authentic Nannari taste. Perfect for the Erode summer heat.', 
    date: 'Oct 15' 
  },
  { 
    id: 'n2', 
    type: 'news', 
    title: 'Blueberry Mania', 
    content: 'Our Blueberry fusion is now the #1 trending drink in Erode college campuses!', 
    date: 'Oct 10' 
  },
];

export const Feedback: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    flavor: 'panner',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch('https://formspree.io/f/mykydpbj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        flavor: form.flavor,
        rating: form.rating,
        comment: form.comment,
      }),
    });

    if (!res.ok) throw new Error('Formspree failed');

    setSubmitted(true);
  } catch (err) {
    console.error('Formspree error:', err);
    alert('Failed to send feedback. Please try again.');
  } finally {
    setIsSubmitting(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', flavor: 'panner', rating: 5, comment: '' });
    }, 6000);
  }
};

  return (
    <section id="feedback" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Feedback Form */}
          <div className="flex-1">
            <div className="inline-block bg-teal-500/20 text-teal-400 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 tracking-widest">Direct Line</div>
            <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">Share Your <span className="text-teal-500 italic">Thoughts.</span></h2>
            <p className="text-slate-400 mb-12 text-xl leading-relaxed">
              Your message goes straight to our quality control team. We don't post these publicly without permission.
            </p>
            
            {submitted ? (
              <div className="bg-teal-600/20 border border-teal-500/30 p-10 rounded-[40px] text-center animate-scaleIn">
                <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20">
                  <i className="fas fa-check-circle text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold mb-4">Sent to Office!</h3>
                <p className="text-slate-300 text-lg">Thank you, {form.name}. Your feedback on our {form.flavor} soda has been received and will help us keep the fizz perfect.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-teal-400 font-bold hover:underline"
                >
                  Send another private note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl p-8 sm:p-12 rounded-[40px] border border-white/5 space-y-8 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-slate-600" 
                      placeholder="e.g. Manoj" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Flavor Tried</label>
                    <div className="relative">
                      <select 
                        value={form.flavor}
                        onChange={(e) => setForm({...form, flavor: e.target.value})}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                      >
                        {FLAVORS.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                      </select>
                      <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Overall Rating</label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        type="button"
                        onClick={() => setForm({...form, rating: star})}
                        className={`text-3xl transition-all transform hover:scale-125 ${form.rating >= star ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'text-slate-700 hover:text-slate-500'}`}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Message for Karur Head Office</label>
                  <textarea 
                    required
                    rows={4}
                    value={form.comment}
                    onChange={(e) => setForm({...form, comment: e.target.value})}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-slate-600"
                    placeholder="Tell us about the quality, fizz, or flavor..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal-600 text-white w-full py-5 rounded-2xl font-black text-lg hover:bg-teal-500 transition shadow-2xl shadow-teal-600/20 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <><i className="fas fa-circle-notch animate-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-envelope"></i> Send Private Feedback</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Latest Buzz Sidebar */}
          <div className="lg:w-96 flex flex-col">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-200 uppercase tracking-tighter">
              <i className="fas fa-bolt text-teal-500"></i> Latest Buzz
            </h3>
            <div className="space-y-6">
              {LATEST_BUZZ.map(item => (
                <div key={item.id} className={`group p-6 rounded-3xl border border-white/5 transition-all duration-300 ${item.type === 'news' ? 'bg-teal-900/20 border-teal-500/20' : 'bg-white/5 hover:bg-white/[0.08]'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 inline-block ${item.type === 'news' ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {item.type === 'news' ? 'Update' : 'Review'}
                      </span>
                      <h4 className="font-bold text-slate-100">{item.type === 'review' ? item.author : item.title}</h4>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">{item.date}</span>
                  </div>
                  {item.type === 'news' && item.author ? null : null}
                  <p className="text-slate-400 text-sm leading-relaxed italic">
                    "{item.content}"
                  </p>
                  {item.type === 'review' && (
                    <div className="mt-3 flex text-yellow-500 text-[8px]">
                       <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-8 rounded-[40px] bg-gradient-to-br from-teal-600 to-teal-800 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 text-center">
                <i className="fas fa-medal text-4xl mb-4 text-white/50"></i>
                <h4 className="text-xl font-black text-white mb-2 leading-tight">Quality Seal</h4>
                <p className="text-teal-100 text-sm">Certified for hygiene and authentic taste across all district.</p>
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
