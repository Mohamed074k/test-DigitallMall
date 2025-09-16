// src/pages/App/profiles/AppModelProfile.jsx
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';
import ModelProfileHeader from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/modelProfileComponents/ModelProfileHeader';
import ModelReelsSection from '../../../components/APP_COMPONENTS/PROFILES_COMPONENTS/modelProfileComponents/ModelReelsSection';
import { AppModelProfileProvider, useModelProfile } from '../../../context/AppContext/AppModelProfileContext';
import { mockModelReels } from '../../../data/AppMockReels';



const ModelProfileContent = () => {
  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { model, loading } = useModelProfile();

  if (loading || !model) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading model profile...</p>
        </div>
      </div>
    );
  }

  const modelReels = mockModelReels.filter(reel => reel.model === model.slug);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-0 px-4 max-w-4xl">

        {/* Model Profile Header */}
        <ModelProfileHeader />

        {/* Reels Section (No Tabs Needed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <ModelReelsSection reels={modelReels} />
        </motion.div>

      </div>
    </div>
  );
};

const AppModelProfile = () => {
  const { modelSlug } = useParams();

  if (!modelSlug) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-red-500">Model not specified</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto md:mx-10 p-4">
      <AppModelProfileProvider modelSlug={modelSlug}>
        <ModelProfileContent />
      </AppModelProfileProvider>
    </div>
  );
};

export default AppModelProfile;