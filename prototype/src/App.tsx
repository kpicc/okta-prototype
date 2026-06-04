import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignInPassword } from './pages/SignInPassword'
import { AccountVerification } from './pages/AccountVerification'
import { SignInCode } from './pages/SignInCode'
import { ForgotPassword } from './pages/ForgotPassword'
import { CreateAccount } from './pages/CreateAccount'
import { VerifyEmail } from './pages/VerifyEmail'
import { LinkServices } from './pages/LinkServices'
import { SetupMFA } from './pages/SetupMFA'
import { SetupMFACode } from './pages/SetupMFACode'
import { Success } from './pages/Success'
import { Overview } from './pages/Overview'
import { AdminProvider } from './context/AdminContext'
import './App.css'

function App() {
  return (
    <AdminProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in-password" element={<SignInPassword />} />
        <Route path="/account-verification" element={<AccountVerification />} />
        <Route path="/sign-in-code" element={<SignInCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/link-services" element={<LinkServices />} />
        <Route path="/setup-mfa" element={<SetupMFA />} />
        <Route path="/setup-mfa-code" element={<SetupMFACode />} />
        <Route path="/success" element={<Success />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </BrowserRouter>
    </AdminProvider>
  )
}

export default App
