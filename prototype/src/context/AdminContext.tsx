import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type FieldType = 'text' | 'email' | 'password' | 'tel' | 'dropdown' | 'radio'

export interface FormField {
  id: string
  label: string
  type: FieldType
  options?: string[]
}

export interface Slide {
  id: string
  image: string
  label: string
  title: string
  highlight: string
  body: string
}

export interface AdminConfig {
  bannerText: string
  bannerVisible: boolean
  heading: string
  subtitleText: string
  subtitleLinkText: string
  buttonText: string
  mobileButtonText?: string
  newToFreedomText: string
  newToFreedomLinkText: string
  footerText: string
  footerLinkText: string
  alertMessage: string
  alertLink1Text: string
  alertLink2Text: string
  fields: FormField[]
  slides: Slide[]
  createAccount: { heading: string; subtitle: string; buttonText: string }
  verifyEmail: { heading: string; subtitle: string; buttonText: string; resendText: string; resendLinkText: string }
  linkServices: { heading: string; subtitle: string; buttonText: string; currentCustomerTitle: string; currentCustomerSubtitle: string; currentCustomerButton: string; newCustomerTitle: string; newCustomerSubtitle: string; newCustomerButton: string }
  setupMFA: { heading: string; subtitle: string; buttonText: string; skipText: string; methods: { value: string; label: string; contactValue: string }[] }
  success: { heading: string; subtitle: string; buttonText: string }
  signInPassword: { heading: string; subtitle: string; showForgotPassword: boolean; forgotPasswordText: string; buttonText: string; showNeedHelp: boolean; needHelpText: string; showNewToFreedom: boolean; newToFreedomText: string }
  accountVerification: { heading: string; subtitle: string; showPhone: boolean; phoneLabel: string; phoneMasked: string; showEmail: boolean; emailLabel: string; emailMasked: string; buttonText: string; showNeedHelp: boolean; needHelpText: string; showNewToFreedom: boolean; newToFreedomText: string }
  signInCode: { heading: string; subtitle: string; inputLabel: string; resendText: string; resendLinkText: string; buttonText: string; showNeedHelp: boolean; needHelpText: string; showNewToFreedom: boolean; newToFreedomText: string }
}

const defaultConfig: AdminConfig = {
  bannerText: 'System maintenance is scheduled for Sunday, June 8 from 2:00–4:00 AM ET. Some services may be temporarily unavailable.',
  bannerVisible: true,
  heading: 'Sign in.',
  subtitleText: 'Phone number and username credentials are now retired.',
  subtitleLinkText: 'Please create your email login',
  buttonText: 'Continue',
  mobileButtonText: 'Sign in',
  newToFreedomText: 'New to Freedom?',
  newToFreedomLinkText: 'Create an account',
  footerText: "Don't have a Freedom phone number?",
  footerLinkText: 'Sign in to manage your Freedom Home Internet & TV services',
  alertMessage: 'Phone number and username login are no longer supported. Please sign in with your email address or update your login details.',
  alertLink1Text: 'Create email login',
  alertLink2Text: 'Learn more',
  fields: [
    { id: '1', label: 'Email', type: 'email' },
  ],
  createAccount: {
    heading: 'Create your account',
    subtitle: 'Please enter your email and password.',
    buttonText: 'Continue',
  },
  verifyEmail: {
    heading: 'Verify your email address',
    subtitle: 'We sent a code to',
    buttonText: 'Continue',
    resendText: "Didn't receive the code?",
    resendLinkText: 'Resend',
  },
  linkServices: {
    heading: 'Link your services',
    subtitle: 'Enter your Freedom phone number and PIN to link your account.',
    buttonText: 'Continue',
    currentCustomerTitle: 'Already a Freedom Mobile customer?',
    currentCustomerSubtitle: 'Link your current wireless services',
    currentCustomerButton: 'Link my services',
    newCustomerTitle: 'Not yet a Freedom Mobile customer?',
    newCustomerSubtitle: 'Discover true mobile Freedom',
    newCustomerButton: 'Explore plans',
  },
  setupMFA: {
    heading: 'Set up multi-factor authentication',
    subtitle: "Choose how you'd like to verify your identity.",
    buttonText: 'Continue',
    skipText: 'Skip for now',
    methods: [
      { value: 'sms', label: 'Text message (SMS)', contactValue: '4167218594' },
      { value: 'email', label: 'Email', contactValue: 'user@example.com' },
    ],
  },
  success: {
    heading: "You're all set!",
    subtitle: 'Your account has been created successfully. You can now sign in with your new email and password.',
    buttonText: 'Go to my account',
  },
  signInPassword: {
    heading: 'Sign in',
    subtitle: 'Please enter your email and password.',
    showForgotPassword: true,
    forgotPasswordText: 'Forgot password?',
    buttonText: 'Continue',
    showNeedHelp: true,
    needHelpText: 'Need help? Message an agent',
    showNewToFreedom: true,
    newToFreedomText: 'New to Freedom? Create an account',
  },
  accountVerification: {
    heading: 'Account verification',
    subtitle: 'How do you want to receive your security code?',
    showPhone: true,
    phoneLabel: 'Phone number',
    phoneMasked: '••••••••94',
    showEmail: true,
    emailLabel: 'Email',
    emailMasked: 'e***l@address.com',
    buttonText: 'Continue',
    showNeedHelp: true,
    needHelpText: 'Need help? Message an agent',
    showNewToFreedom: true,
    newToFreedomText: 'New to Freedom? Create an account',
  },
  signInCode: {
    heading: 'Account verification.',
    subtitle: 'We sent a code to',
    inputLabel: 'Enter code',
    resendText: "Didn't get a code?",
    resendLinkText: 'Resend',
    buttonText: 'Continue',
    showNeedHelp: true,
    needHelpText: 'Need help? Message an agent',
    showNewToFreedom: true,
    newToFreedomText: 'New to Freedom? Create an account',
  },
  slides: [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      label: 'Exciting News',
      title: "We've updated your log in experience for ",
      highlight: 'better security.',
      body: "We're excited to announce that have upgraded our login system. This change is part of our commitment to providing you with enhanced security, and a more modern experience.",
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      label: 'New Feature',
      title: 'Manage your account ',
      highlight: 'anywhere, anytime.',
      body: 'Access your Freedom Mobile account on any device. Check your usage, pay your bill, and manage your plan — all in one place.',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
      label: 'Stay Secure',
      title: 'Your security is our ',
      highlight: 'top priority.',
      body: 'We use the latest encryption and authentication technology to keep your account and personal information safe.',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
      label: 'Better Together',
      title: 'Connect with ',
      highlight: 'confidence.',
      body: 'Freedom Mobile gives you the network coverage and plan flexibility you need to stay connected with the people who matter most.',
    },
  ],
}

interface AdminContextValue {
  config: AdminConfig
  setConfig: (config: AdminConfig) => void
  adminOpen: boolean
  setAdminOpen: (open: boolean) => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AdminConfig>(defaultConfig)
  const [adminOpen, setAdminOpen] = useState(false)

  return (
    <AdminContext.Provider value={{ config, setConfig, adminOpen, setAdminOpen }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
