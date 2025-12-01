/**
 * ReadAloudOptionsSheet - Settings overlay for TTS controls
 * 
 * Options:
 * - Speech rate: 0.8x / 1.0x / 1.2x
 * - Read depth: Labels only / Screen summary / Read all
 * - Voice selection (placeholder)
 * - Retry / Stop controls
 */

import React from 'react';
import { X, Volume2, Gauge, Layers } from 'lucide-react';
import { useReadAloud } from './ReadAloudContext';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface ReadAloudOptionsSheetProps {
  language: 'en' | 'ur';
}

export function ReadAloudOptionsSheet({ language }: ReadAloudOptionsSheetProps) {
  const { 
    showOptions, 
    toggleOptions, 
    rate, 
    setRate, 
    depth, 
    setDepth,
    stop
  } = useReadAloud();

  const text = {
    en: {
      title: 'Reading Options',
      description: 'Customize how content is read aloud',
      speechRate: 'Speech Rate',
      slow: 'Slow (0.8×)',
      normal: 'Normal (1.0×)',
      fast: 'Fast (1.2×)',
      readDepth: 'Read Depth',
      labelsOnly: 'Labels Only',
      labelsDesc: 'Read only field labels and headers',
      summary: 'Screen Summary',
      summaryDesc: 'Read key information (recommended)',
      readAll: 'Read All',
      readAllDesc: 'Read all content including details',
      stopReading: 'Stop Reading',
      close: 'Close'
    },
    ur: {
      title: 'پڑھنے کے اختیارات',
      description: 'مواد کو بلند آواز میں پڑھنے کی ترتیبات',
      speechRate: 'تقریر کی رفتار',
      slow: 'سست (0.8×)',
      normal: 'عام (1.0×)',
      fast: 'تیز (1.2×)',
      readDepth: 'پڑھنے کی گہرائی',
      labelsOnly: 'صرف لیبلز',
      labelsDesc: 'صرف فیلڈ لیبلز اور ہیڈرز پڑھیں',
      summary: 'اسکرین کا خلاصہ',
      summaryDesc: 'اہم معلومات پڑھیں (تجویز کردہ)',
      readAll: 'سب پڑھیں',
      readAllDesc: 'تفصیلات سمیت تمام مواد پڑھیں',
      stopReading: 'پڑھنا بند کریں',
      close: 'بند کریں'
    }
  };

  const t = text[language];

  return (
    <Sheet open={showOptions} onOpenChange={toggleOptions}>
      <SheetContent 
        side="bottom" 
        className="h-[480px] rounded-t-3xl"
      >
        <SheetHeader className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0CAA41]/10 flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-[#0CAA41]" />
              </div>
              <div>
                <SheetTitle className="text-xl mb-1">
                  {t.title}
                </SheetTitle>
                <SheetDescription className="text-base">
                  {t.description}
                </SheetDescription>
              </div>
            </div>
            <Button
              onClick={toggleOptions}
              variant="ghost"
              size="icon"
              className="min-w-[44px] min-h-[44px] rounded-full"
              aria-label={t.close}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-8 pb-6">
          {/* Speech Rate */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <Label className="text-lg">{t.speechRate}</Label>
            </div>
            
            <RadioGroup 
              value={rate.toString()} 
              onValueChange={(value) => setRate(parseFloat(value) as 0.8 | 1.0 | 1.2)}
              className="space-y-3"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="0.8" 
                  id="rate-0.8" 
                  className="min-w-[24px] min-h-[24px] w-6 h-6"
                />
                <Label 
                  htmlFor="rate-0.8" 
                  className="ml-3 flex-1 cursor-pointer py-3 text-lg"
                >
                  {t.slow}
                </Label>
              </div>
              
              <div className="flex items-center">
                <RadioGroupItem 
                  value="1.0" 
                  id="rate-1.0"
                  className="min-w-[24px] min-h-[24px] w-6 h-6"
                />
                <Label 
                  htmlFor="rate-1.0" 
                  className="ml-3 flex-1 cursor-pointer py-3 text-lg"
                >
                  {t.normal}
                </Label>
              </div>
              
              <div className="flex items-center">
                <RadioGroupItem 
                  value="1.2" 
                  id="rate-1.2"
                  className="min-w-[24px] min-h-[24px] w-6 h-6"
                />
                <Label 
                  htmlFor="rate-1.2" 
                  className="ml-3 flex-1 cursor-pointer py-3 text-lg"
                >
                  {t.fast}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Read Depth */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <Label className="text-lg">{t.readDepth}</Label>
            </div>
            
            <RadioGroup 
              value={depth} 
              onValueChange={(value) => setDepth(value as 'labels' | 'summary' | 'all')}
              className="space-y-3"
            >
              <div className="flex items-start">
                <RadioGroupItem 
                  value="labels" 
                  id="depth-labels"
                  className="min-w-[24px] min-h-[24px] w-6 h-6 mt-0.5"
                />
                <div className="ml-3 flex-1">
                  <Label 
                    htmlFor="depth-labels" 
                    className="cursor-pointer text-lg block mb-1"
                  >
                    {t.labelsOnly}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.labelsDesc}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <RadioGroupItem 
                  value="summary" 
                  id="depth-summary"
                  className="min-w-[24px] min-h-[24px] w-6 h-6 mt-0.5"
                />
                <div className="ml-3 flex-1">
                  <Label 
                    htmlFor="depth-summary" 
                    className="cursor-pointer text-lg block mb-1"
                  >
                    {t.summary}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.summaryDesc}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <RadioGroupItem 
                  value="all" 
                  id="depth-all"
                  className="min-w-[24px] min-h-[24px] w-6 h-6 mt-0.5"
                />
                <div className="ml-3 flex-1">
                  <Label 
                    htmlFor="depth-all" 
                    className="cursor-pointer text-lg block mb-1"
                  >
                    {t.readAll}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.readAllDesc}
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Stop Reading Button */}
          <Button
            onClick={() => {
              stop();
              toggleOptions();
            }}
            className="w-full h-14 text-lg bg-red-500 hover:bg-red-600 text-white"
          >
            {t.stopReading}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
