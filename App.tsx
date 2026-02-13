
import React, { useState } from 'react';
import { Tab } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import HemoScanner from './components/HemoScanner';
import ConceptLibrary from './components/ConceptLibrary';
import StrategyView from './components/StrategyView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'scanner':
        return <HemoScanner />;
      case 'concepts':
        return <ConceptLibrary />;
      case 'strategy':
        return <StrategyView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
