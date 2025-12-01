/**
 * ReadAloudDemoScreen - Demonstration of Read-Aloud/TTS functionality
 * 
 * This screen shows:
 * - How to integrate TTS with screen content
 * - Text highlighting during playback
 * - Reading order priorities
 * - Bilingual support (English + Urdu)
 */

import React, { useEffect } from 'react';
import { ArrowLeft, Play, MapPin, Clock, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { TextHighlight } from './TextHighlight';
import { useReadAloudScreen } from './ReadAloudWrapper';

interface ReadAloudDemoScreenProps {
  onBack: () => void;
  language: 'en' | 'ur';
}

export function ReadAloudDemoScreen({ onBack, language }: ReadAloudDemoScreenProps) {
  const text = {
    en: {
      title: 'Read-Aloud Demo',
      subtitle: 'Test the Text-to-Speech functionality',
      alert: 'This is an important alert message',
      section1Title: 'Booking Details',
      pickup: 'Pickup: Johar Town, Lahore',
      dropoff: 'Dropoff: Liberty Market, Gulberg',
      eta: 'Estimated arrival: 5 minutes',
      section2Title: 'Payment Information',
      fare: 'Total Fare: PKR 250',
      paymentMethod: 'Payment Method: Cash',
      section3Title: 'Driver Information',
      driverName: 'Driver: Ahmed Khan',
      rating: 'Rating: 4.8 stars',
      vehicle: 'Vehicle: Honda CD 70 - ABC 123',
      ctaPrimary: 'Confirm Booking',
      ctaSecondary: 'Start Reading Demo',
      instructions: 'Tap "Start Reading Demo" to hear this screen read aloud. Watch for yellow highlighting on text as it\'s being read.',
      footer: 'This is footer text that will only be read in "Read All" mode.'
    },
    ur: {
      title: 'ریڈ الاؤڈ ڈیمو',
      subtitle: 'ٹیکسٹ ٹو اسپیچ فنکشنلٹی کی جانچ کریں',
      alert: 'یہ ایک اہم انتباہی پیغام ہے',
      section1Title: 'بکنگ کی تفصیلات',
      pickup: 'پک اپ: جوہر ٹاؤن، لاہور',
      dropoff: 'ڈراپ آف: لبرٹی مارکیٹ، گلبرگ',
      eta: 'اندازاً آمد: 5 منٹ',
      section2Title: 'ادائیگی کی معلومات',
      fare: 'کل کرایہ: PKR 250',
      paymentMethod: 'ادائیگی کا طریقہ: نقد',
      section3Title: 'ڈرائیور کی معلومات',
      driverName: 'ڈرائیور: احمد خان',
      rating: 'ریٹنگ: 4.8 ستارے',
      vehicle: 'گاڑی: ہونڈا CD 70 - ABC 123',
      ctaPrimary: 'بکنگ کی تصدیق کریں',
      ctaSecondary: 'ریڈنگ ڈیمو شروع کریں',
      instructions: '"ریڈنگ ڈیمو شروع کریں" پر تھپتھپائیں تاکہ یہ اسکرین بلند آواز میں سنی جائے۔ پڑھے جانے کے دوران متن پر پیلے رنگ کی ہائی لائٹنگ دیکھیں۔',
      footer: 'یہ فوٹر ٹیکسٹ ہے جو صرف "سب پڑھیں" موڈ میں پڑھا جائے گا۔'
    }
  };

  const t = text[language];

  // Define reading order with explicit text array
  const readableTexts = [
    t.title,
    t.subtitle,
    t.alert,
    t.section1Title,
    t.pickup,
    t.dropoff,
    t.eta,
    t.section2Title,
    t.fare,
    t.paymentMethod,
    t.section3Title,
    t.driverName,
    t.rating,
    t.vehicle,
    t.ctaPrimary,
    t.instructions,
    t.footer
  ];

  // Initialize read-aloud for this screen
  const { startReading } = useReadAloudScreen('Demo Screen', readableTexts);

  return (
    <div className="h-screen flex flex-col bg-[#F5F8F3] dark:bg-[#1E1E1E]">
      {/* Header */}
      <div className="bg-white dark:bg-[#2A2A2A] px-5 py-4 flex items-center gap-4 shadow-sm">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
          className="min-w-[48px] min-h-[48px] rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1">
          <TextHighlight text={t.title}>
            <h1>{t.title}</h1>
          </TextHighlight>
          <TextHighlight text={t.subtitle}>
            <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          </TextHighlight>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Alert (High Priority) */}
        <div 
          role="alert" 
          className="bg-[#0CAA41]/10 border-l-4 border-[#0CAA41] px-4 py-3 rounded"
          data-tts-important
        >
          <TextHighlight text={t.alert}>
            <p className="text-[#0CAA41]">{t.alert}</p>
          </TextHighlight>
        </div>

        {/* Section 1: Booking Details */}
        <Card className="p-5 space-y-4">
          <TextHighlight text={t.section1Title}>
            <h2 className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#0CAA41]" />
              {t.section1Title}
            </h2>
          </TextHighlight>
          
          <div className="space-y-3">
            <TextHighlight text={t.pickup}>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-[#0CAA41] mt-1.5" />
                <p>{t.pickup}</p>
              </div>
            </TextHighlight>
            
            <TextHighlight text={t.dropoff}>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5" />
                <p>{t.dropoff}</p>
              </div>
            </TextHighlight>
            
            <TextHighlight text={t.eta}>
              <div 
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                data-tts-important
              >
                <Clock className="w-4 h-4" />
                <p>{t.eta}</p>
              </div>
            </TextHighlight>
          </div>
        </Card>

        {/* Section 2: Payment */}
        <Card className="p-5 space-y-4">
          <TextHighlight text={t.section2Title}>
            <h2 className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#0CAA41]" />
              {t.section2Title}
            </h2>
          </TextHighlight>
          
          <div className="space-y-3">
            <TextHighlight text={t.fare}>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Fare:</span>
                <span className="fare" data-tts-important>PKR 250</span>
              </div>
            </TextHighlight>
            
            <TextHighlight text={t.paymentMethod}>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                <span>Cash</span>
              </div>
            </TextHighlight>
          </div>
        </Card>

        {/* Section 3: Driver Info */}
        <Card className="p-5 space-y-3">
          <TextHighlight text={t.section3Title}>
            <h2>{t.section3Title}</h2>
          </TextHighlight>
          
          <TextHighlight text={t.driverName}>
            <p>{t.driverName}</p>
          </TextHighlight>
          
          <TextHighlight text={t.rating}>
            <p className="text-gray-600 dark:text-gray-400">{t.rating}</p>
          </TextHighlight>
          
          <TextHighlight text={t.vehicle}>
            <p className="text-gray-600 dark:text-gray-400">{t.vehicle}</p>
          </TextHighlight>
        </Card>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <TextHighlight text={t.instructions}>
            <p className="text-sm text-blue-900 dark:text-blue-100">
              {t.instructions}
            </p>
          </TextHighlight>
        </div>

        {/* Footer (Low Priority) */}
        <TextHighlight text={t.footer}>
          <p className="text-xs text-center text-gray-500 dark:text-gray-500">
            {t.footer}
          </p>
        </TextHighlight>
      </div>

      {/* Action Buttons */}
      <div className="bg-white dark:bg-[#2A2A2A] px-5 py-4 space-y-3 border-t dark:border-gray-800">
        {/* Primary CTA */}
        <TextHighlight text={t.ctaPrimary}>
          <Button
            className="w-full h-14 bg-[#0CAA41] hover:bg-[#0a8f37] text-white"
            onClick={() => console.log('Primary action')}
          >
            {t.ctaPrimary}
          </Button>
        </TextHighlight>

        {/* Secondary CTA - Start Reading */}
        <Button
          onClick={startReading}
          variant="outline"
          className="w-full h-14 flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          {t.ctaSecondary}
        </Button>
      </div>
    </div>
  );
}
