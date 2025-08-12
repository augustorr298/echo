// Data Collection and Integration Service
class DataCollectionService {
    constructor() {
        this.dataStore = {
            assessments: [],
            biometrics: [],
            interventions: [],
            userProfile: {},
            preferences: {}
        };
        this.initialized = false;
    }

    // Initialize the service
    async initialize() {
        try {
            // Load existing data from localStorage
            const storedData = localStorage.getItem('echoMentalHealthData');
            if (storedData) {
                this.dataStore = { ...this.dataStore, ...JSON.parse(storedData) };
            }
            
            // Initialize wearable connections
            await this.initializeWearableConnections();
            
            this.initialized = true;
            console.log('Data Collection Service initialized');
        } catch (error) {
            console.error('Failed to initialize Data Collection Service:', error);
        }
    }

    // Save assessment data
    saveAssessment(assessmentData) {
        const assessment = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            type: 'mental_health_assessment',
            data: assessmentData,
            source: 'app_questionnaire'
        };

        this.dataStore.assessments.push(assessment);
        this.persistData();
        
        // Trigger analytics update
        this.analyzePatterns();
        
        return assessment.id;
    }

    // Save biometric data
    saveBiometricData(data, source = 'manual') {
        const biometricEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            data: data,
            source: source, // 'camera', 'wearable', 'manual', etc.
        };

        this.dataStore.biometrics.push(biometricEntry);
        this.persistData();
        
        return biometricEntry.id;
    }

    // Save intervention usage
    saveInterventionUsage(interventionType, duration, effectiveness) {
        const intervention = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            type: interventionType,
            duration: duration,
            effectiveness: effectiveness, // 1-5 scale
            context: this.getCurrentContext()
        };

        this.dataStore.interventions.push(intervention);
        this.persistData();
        
        return intervention.id;
    }

    // Camera-based emotion detection
    async analyzeFacialExpressions(videoElement) {
        try {
            // This would integrate with TensorFlow.js or similar
            // For now, returning mock data
            const mockEmotionData = {
                emotions: {
                    happiness: Math.random() * 0.4,
                    sadness: Math.random() * 0.3,
                    anxiety: Math.random() * 0.4,
                    stress: Math.random() * 0.3,
                    neutral: Math.random() * 0.5,
                    anger: Math.random() * 0.2,
                    fear: Math.random() * 0.2
                },
                microExpressions: {
                    eyeMovement: Math.random() * 100,
                    blinkRate: Math.random() * 20 + 15,
                    facialTension: Math.random() * 100,
                    jawTension: Math.random() * 100
                },
                faceMetrics: {
                    symmetry: Math.random() * 100,
                    skinTone: Math.random() * 100,
                    eyeBags: Math.random() * 100
                },
                confidence: 0.75 + Math.random() * 0.2,
                processingTime: Math.random() * 500 + 200
            };

            this.saveBiometricData(mockEmotionData, 'camera');
            return mockEmotionData;
        } catch (error) {
            console.error('Facial expression analysis failed:', error);
            return null;
        }
    }

    // Heart rate detection through camera
    async detectHeartRateFromCamera(videoElement) {
        try {
            // This would use photoplethysmography (PPG) through camera
            // Analyzing color changes in face/fingertip
            const mockHeartRateData = {
                heartRate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
                heartRateVariability: Math.random() * 50 + 25,
                confidence: 0.7 + Math.random() * 0.25,
                signalQuality: Math.random() * 100,
                timestamp: new Date().toISOString()
            };

            this.saveBiometricData(mockHeartRateData, 'camera_ppg');
            return mockHeartRateData;
        } catch (error) {
            console.error('Heart rate detection failed:', error);
            return null;
        }
    }

    // Initialize wearable device connections
    async initializeWearableConnections() {
        try {
            // Check for Web Bluetooth support
            if ('bluetooth' in navigator) {
                console.log('Bluetooth API available');
                // Future implementation for fitness trackers, smartwatches
            }

            // Check for Web USB support
            if ('usb' in navigator) {
                console.log('USB API available');
                // Future implementation for USB-connected devices
            }

            // Initialize mock wearable data
            this.startMockWearableDataCollection();
        } catch (error) {
            console.error('Wearable initialization error:', error);
        }
    }

    // Mock wearable data collection (for demonstration)
    startMockWearableDataCollection() {
        // Simulate periodic data from a fitness tracker
        setInterval(() => {
            if (Math.random() > 0.8) { // 20% chance every interval
                const wearableData = {
                    heartRate: Math.floor(Math.random() * 40) + 60,
                    steps: Math.floor(Math.random() * 1000),
                    sleepQuality: Math.random() * 100,
                    stressLevel: Math.random() * 100,
                    skinTemperature: 36 + Math.random() * 2,
                    oxygenSaturation: 95 + Math.random() * 5
                };
                
                this.saveBiometricData(wearableData, 'wearable_mock');
            }
        }, 30000); // Every 30 seconds
    }

    // Analyze patterns in collected data
    analyzePatterns() {
        try {
            const recentData = this.getRecentData(7); // Last 7 days
            
            const patterns = {
                moodTrends: this.analyzeMoodTrends(recentData.assessments),
                biometricPatterns: this.analyzeBiometricPatterns(recentData.biometrics),
                interventionEffectiveness: this.analyzeInterventionEffectiveness(recentData.interventions),
                riskFactors: this.identifyRiskFactors(recentData),
                recommendations: this.generateRecommendations(recentData)
            };

            // Store analysis results
            this.dataStore.latestAnalysis = {
                timestamp: new Date().toISOString(),
                patterns: patterns
            };

            this.persistData();
            return patterns;
        } catch (error) {
            console.error('Pattern analysis failed:', error);
            return null;
        }
    }

    // Get recent data within specified days
    getRecentData(days) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        return {
            assessments: this.dataStore.assessments.filter(
                item => new Date(item.timestamp) > cutoffDate
            ),
            biometrics: this.dataStore.biometrics.filter(
                item => new Date(item.timestamp) > cutoffDate
            ),
            interventions: this.dataStore.interventions.filter(
                item => new Date(item.timestamp) > cutoffDate
            )
        };
    }

    // Analyze mood trends
    analyzeMoodTrends(assessments) {
        if (assessments.length < 2) return { trend: 'insufficient_data' };

        const moodScores = assessments
            .map(a => a.data.overallScore)
            .filter(score => score !== undefined);

        if (moodScores.length < 2) return { trend: 'insufficient_data' };

        const firstHalf = moodScores.slice(0, Math.ceil(moodScores.length / 2));
        const secondHalf = moodScores.slice(Math.floor(moodScores.length / 2));

        const firstAvg = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length;

        const difference = secondAvg - firstAvg;

        return {
            trend: difference > 0.2 ? 'improving' : difference < -0.2 ? 'declining' : 'stable',
            change: difference,
            currentAverage: secondAvg,
            confidence: Math.min(moodScores.length / 10, 1) // More data = higher confidence
        };
    }

    // Analyze biometric patterns
    analyzeBiometricPatterns(biometrics) {
        const heartRateData = biometrics
            .filter(b => b.data.heartRate)
            .map(b => b.data.heartRate);

        const stressData = biometrics
            .filter(b => b.data.stressLevel)
            .map(b => b.data.stressLevel);

        return {
            heartRate: {
                average: heartRateData.length > 0 ? 
                    heartRateData.reduce((sum, hr) => sum + hr, 0) / heartRateData.length : null,
                trend: this.calculateTrend(heartRateData),
                variability: this.calculateVariability(heartRateData)
            },
            stress: {
                average: stressData.length > 0 ? 
                    stressData.reduce((sum, s) => sum + s, 0) / stressData.length : null,
                trend: this.calculateTrend(stressData)
            }
        };
    }

    // Analyze intervention effectiveness
    analyzeInterventionEffectiveness(interventions) {
        const effectiveness = {};
        
        interventions.forEach(intervention => {
            if (!effectiveness[intervention.type]) {
                effectiveness[intervention.type] = {
                    uses: 0,
                    totalEffectiveness: 0,
                    avgDuration: 0,
                    totalDuration: 0
                };
            }
            
            effectiveness[intervention.type].uses++;
            effectiveness[intervention.type].totalEffectiveness += intervention.effectiveness || 3;
            effectiveness[intervention.type].totalDuration += intervention.duration || 300;
        });

        // Calculate averages
        Object.keys(effectiveness).forEach(type => {
            const data = effectiveness[type];
            data.avgEffectiveness = data.totalEffectiveness / data.uses;
            data.avgDuration = data.totalDuration / data.uses;
        });

        return effectiveness;
    }

    // Identify risk factors
    identifyRiskFactors(data) {
        const risks = [];

        // Check mood trends
        const moodTrend = this.analyzeMoodTrends(data.assessments);
        if (moodTrend.trend === 'declining') {
            risks.push({
                type: 'declining_mood',
                severity: Math.abs(moodTrend.change) > 0.5 ? 'high' : 'medium',
                description: 'Estado de ánimo en declive'
            });
        }

        // Check biometric patterns
        const biometrics = this.analyzeBiometricPatterns(data.biometrics);
        if (biometrics.heartRate.average > 90) {
            risks.push({
                type: 'elevated_heart_rate',
                severity: 'medium',
                description: 'Frecuencia cardíaca elevada promedio'
            });
        }

        // Check intervention usage
        if (data.interventions.length < 3) {
            risks.push({
                type: 'low_engagement',
                severity: 'low',
                description: 'Bajo uso de técnicas de calma'
            });
        }

        return risks;
    }

    // Generate personalized recommendations
    generateRecommendations(data) {
        const recommendations = [];

        // Based on mood trends
        const moodTrend = this.analyzeMoodTrends(data.assessments);
        if (moodTrend.trend === 'declining') {
            recommendations.push({
                type: 'intervention',
                priority: 'high',
                message: 'Considera aumentar el uso de técnicas de respiración y afirmaciones positivas'
            });
        }

        // Based on intervention effectiveness
        const effectiveness = this.analyzeInterventionEffectiveness(data.interventions);
        const mostEffective = Object.entries(effectiveness)
            .sort((a, b) => b[1].avgEffectiveness - a[1].avgEffectiveness)[0];

        if (mostEffective) {
            recommendations.push({
                type: 'technique',
                priority: 'medium',
                message: `La técnica "${mostEffective[0]}" ha sido más efectiva para ti`
            });
        }

        // General wellness recommendations
        recommendations.push({
            type: 'general',
            priority: 'low',
            message: 'Mantén un horario regular para tus evaluaciones de bienestar'
        });

        return recommendations;
    }

    // Utility functions
    calculateTrend(values) {
        if (values.length < 2) return 'insufficient_data';
        
        const firstHalf = values.slice(0, Math.ceil(values.length / 2));
        const secondHalf = values.slice(Math.floor(values.length / 2));
        
        const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
        
        const difference = secondAvg - firstAvg;
        return difference > 5 ? 'increasing' : difference < -5 ? 'decreasing' : 'stable';
    }

    calculateVariability(values) {
        if (values.length < 2) return 0;
        
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        return Math.sqrt(variance);
    }

    getCurrentContext() {
        return {
            timeOfDay: new Date().getHours(),
            dayOfWeek: new Date().getDay(),
            location: 'unknown', // Would integrate with geolocation
            weather: 'unknown'   // Would integrate with weather API
        };
    }

    // Data persistence
    persistData() {
        try {
            localStorage.setItem('echoMentalHealthData', JSON.stringify(this.dataStore));
        } catch (error) {
            console.error('Failed to persist data:', error);
        }
    }

    // Export data for analysis or backup
    exportData() {
        return {
            exportDate: new Date().toISOString(),
            version: '1.0',
            data: this.dataStore
        };
    }

    // Clear all data (with confirmation)
    clearAllData() {
        this.dataStore = {
            assessments: [],
            biometrics: [],
            interventions: [],
            userProfile: {},
            preferences: {}
        };
        localStorage.removeItem('echoMentalHealthData');
    }

    // Get comprehensive analytics
    getAnalytics(timeRange = 30) {
        const recentData = this.getRecentData(timeRange);
        return {
            summary: {
                totalAssessments: recentData.assessments.length,
                totalInterventions: recentData.interventions.length,
                averageMoodScore: this.calculateAverageScore(recentData.assessments),
                timeRange: timeRange
            },
            patterns: this.analyzePatterns(),
            riskFactors: this.identifyRiskFactors(recentData),
            recommendations: this.generateRecommendations(recentData)
        };
    }

    calculateAverageScore(assessments) {
        if (assessments.length === 0) return null;
        
        const scores = assessments
            .map(a => a.data.overallScore)
            .filter(score => score !== undefined);
            
        return scores.length > 0 ? 
            scores.reduce((sum, score) => sum + score, 0) / scores.length : null;
    }
}

// Create singleton instance
const dataCollectionService = new DataCollectionService();

export default dataCollectionService;
