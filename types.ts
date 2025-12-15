import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface TechConcept {
  title: string;
  description: string;
  specs: string[];
  impact: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}