import React from 'react'
import PageHeader from '../../Common/PageHeader'
import Navbar from '../../Common/Navbar'

const Privacy = () => {
  return (
    <>
    <Navbar/>
    <div className="max-w-screen-lg m-auto min-h-screen p-8 text-green-200">
    <div className="container mx-auto">
      <header className='pt-20'>
        <PageHeader
            title={'Privacy Policy'}
            mt={'0'}
        />
      </header>
      <main className=" p-8 rounded-lg shadow-md">
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p className='font-medium text-gray-600'>1.1. Information you provide:</p>
          <p className='font-medium text-gray-600'>1.2. Podcast preferences:</p>
          <p className='font-medium text-gray-600'>1.3. Device information:</p>
          <p className='font-medium text-gray-600'>1.4. Usage information:</p>
          <p className='font-medium text-gray-600'>1.5. Communication data:</p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p className='font-medium text-gray-600'>2.1. Service Provision</p>
          <p className='font-medium text-gray-600'>2.2. Personalization</p>
          <p className='font-medium text-gray-600'>2.3. Communication</p>
          <p className='font-medium text-gray-600'>2.4. Analytics</p>
          <p className='font-medium text-gray-600'>2.5. Legal Compliance</p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
          <p className='font-medium text-gray-600'>3.1. Service Providers</p>
          <p className='font-medium text-gray-600'>3.2. Legal Requirements</p>
          <p className='font-medium text-gray-600'>3.3. Business Transfers</p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <p className='text-gray-600'>
            We take reasonable steps to protect your personal information from unauthorized access, use, and disclosure. However, no method of transmission over the internet or electronic storage is entirely secure.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">5. Your Choices</h2>
          <p className='text-gray-600'>You can manage your privacy preferences within our application. You may choose to opt out of marketing communications at any time.</p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">6. Changes to this Privacy Policy</h2>
          <p className='text-gray-600'>We may update this Privacy Policy as our application evolves. You will be notified of any material changes. By continuing to use our application, you consent to the updated Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p className='text-gray-600'>If you have questions or concerns about this Privacy Policy or your data, please contact us at [Your Contact Information].</p>
        </section>
      </main>
    </div>
  </div>
    </>
  )
}

export default Privacy