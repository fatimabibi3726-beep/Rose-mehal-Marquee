// TODO: replace with real data from Supabase (notifications table, filtered by logged-in user)
export const NOTIFICATIONS = [
  {
    id: 1,
    type: 'payment',
    message: 'Advance payment of Rs. 80,000 received for Wedding Reception.',
    date: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'booking',
    message: 'Your Mehndi Night booking on 12 Mar 2026 has been confirmed.',
    date: '1 day ago',
    read: false,
  },
  {
    id: 3,
    type: 'general',
    message: 'Rose Mehal will be closed for maintenance on 20 Mar 2026.',
    date: '3 days ago',
    read: true,
  },
  {
    id: 4,
    type: 'booking',
    message: 'Your Corporate Dinner booking on 02 Jan 2026 was cancelled.',
    date: '2 weeks ago',
    read: true,
  },
]
