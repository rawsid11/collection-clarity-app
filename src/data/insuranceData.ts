// Mock data structure based on CSV columns: Branch, Region, Channel, Product, Due Month, Due Amount, Act Collection, Predicted Collection

export interface InsuranceRecord {
  branch: string;
  region: string;
  channel: string;
  product: string;
  dueMonth: string;
  dueAmount: number;
  actCollection: number;
  predictedCollection: number;
}

// Generate comprehensive mock data
export const generateMockData = (): InsuranceRecord[] => {
  const branches = Array.from({ length: 58 }, (_, i) => `Branch-${String(i + 1).padStart(2, '0')}`);
  const regions = ['Chennai', 'Mumbai', 'Delhi'];
  const channels = ['SBI', 'RETAIL'];
  const products = ['ULIP-A', 'ULIP-B', 'Term-A', 'Term-B', 'Endowment-A', 'Endowment-B'];
  const months = ['Feb25', 'Mar25', 'Apr25', 'May25', 'Jun25', 'Jul25'];

  const data: InsuranceRecord[] = [];

  branches.forEach((branch, branchIndex) => {
    const region = regions[Math.floor(branchIndex / 19)]; // 19 branches per region roughly
    const channel = branchIndex % 2 === 0 ? 'SBI' : 'RETAIL';

    months.forEach(month => {
      products.forEach(product => {
        // Generate realistic insurance amounts
        const baseDueAmount = Math.random() * 50000 + 10000; // 10K to 60K
        const dueAmount = Math.round(baseDueAmount);
        
        // Collection rates vary by region, channel, product
        let collectionRate = 0.92 + Math.random() * 0.08; // 92-100%
        
        // Regional performance differences
        if (region === 'Mumbai') collectionRate += 0.02;
        if (region === 'Delhi') collectionRate -= 0.01;
        
        // Channel performance differences
        if (channel === 'SBI') collectionRate += 0.01;
        
        // Product performance differences
        if (product.includes('ULIP')) collectionRate += 0.015;
        if (product.includes('Term')) collectionRate += 0.02;
        if (product.includes('Endowment')) collectionRate -= 0.005;
        
        // For historical months, actual collection is based on rates
        let actCollection = 0;
        if (month !== 'Jul25') { // Jul25 is current month
          actCollection = Math.round(dueAmount * collectionRate);
        }
        
        // Predicted collection has some variance
        const predictionAccuracy = 0.95 + Math.random() * 0.1; // 95-105% accuracy
        const predictedCollection = Math.round(dueAmount * collectionRate * predictionAccuracy);

        data.push({
          branch,
          region,
          channel,
          product,
          dueMonth: month,
          dueAmount,
          actCollection,
          predictedCollection
        });
      });
    });
  });

  return data;
};

export const mockData = generateMockData();

// KPI Calculation functions
export class KPICalculator {
  private data: InsuranceRecord[];

  constructor(data: InsuranceRecord[]) {
    this.data = data;
  }

  // Portfolio & Volume KPIs (1-10)
  getTotalPortfolio() {
    return this.data.reduce((sum, record) => sum + record.dueAmount, 0);
  }

  getTotalBranches() {
    return [...new Set(this.data.map(r => r.branch))].length;
  }

  getTotalRegions() {
    return [...new Set(this.data.map(r => r.region))].length;
  }

  getTotalProducts() {
    return [...new Set(this.data.map(r => r.product))].length;
  }

  getTotalChannels() {
    return [...new Set(this.data.map(r => r.channel))].length;
  }

  getAveragePolicySize() {
    return this.getTotalPortfolio() / this.data.length;
  }

  getMedianPolicySize() {
    const amounts = this.data.map(r => r.dueAmount).sort((a, b) => a - b);
    const mid = Math.floor(amounts.length / 2);
    return amounts.length % 2 === 0 ? (amounts[mid - 1] + amounts[mid]) / 2 : amounts[mid];
  }

  getLargestPolicyAmount() {
    return Math.max(...this.data.map(r => r.dueAmount));
  }

  getSmallestPolicyAmount() {
    return Math.min(...this.data.map(r => r.dueAmount));
  }

  // Collection Performance KPIs (11-18)
  getOverallCollectionRate() {
    const historicalData = this.data.filter(r => r.dueMonth !== 'Jul25');
    const totalDue = historicalData.reduce((sum, r) => sum + r.dueAmount, 0);
    const totalCollected = historicalData.reduce((sum, r) => sum + r.actCollection, 0);
    return totalDue > 0 ? (totalCollected / totalDue) * 100 : 0;
  }

  getTotalCollections() {
    return this.data.filter(r => r.dueMonth !== 'Jul25').reduce((sum, r) => sum + r.actCollection, 0);
  }

  // Current Month KPIs (19-25)
  getCurrentMonthTarget() {
    return this.data.filter(r => r.dueMonth === 'Jul25').reduce((sum, r) => sum + r.dueAmount, 0);
  }

  getCurrentMonthPrediction() {
    return this.data.filter(r => r.dueMonth === 'Jul25').reduce((sum, r) => sum + r.predictedCollection, 0);
  }

  getPredictionGap() {
    const target = this.getCurrentMonthTarget();
    const prediction = this.getCurrentMonthPrediction();
    return target - prediction;
  }

  getPredictionGapPercentage() {
    const target = this.getCurrentMonthTarget();
    const gap = this.getPredictionGap();
    return target > 0 ? (gap / target) * 100 : 0;
  }

  // Regional Performance KPIs (26-37)
  getRegionalData(region: string) {
    const regionData = this.data.filter(r => r.region === region);
    const portfolio = regionData.reduce((sum, r) => sum + r.dueAmount, 0);
    const historicalData = regionData.filter(r => r.dueMonth !== 'Jul25');
    const totalDue = historicalData.reduce((sum, r) => sum + r.dueAmount, 0);
    const totalCollected = historicalData.reduce((sum, r) => sum + r.actCollection, 0);
    const collectionRate = totalDue > 0 ? (totalCollected / totalDue) * 100 : 0;
    
    const currentData = regionData.filter(r => r.dueMonth === 'Jul25');
    const currentTarget = currentData.reduce((sum, r) => sum + r.dueAmount, 0);
    const currentPrediction = currentData.reduce((sum, r) => sum + r.predictedCollection, 0);
    const currentGap = currentTarget - currentPrediction;
    
    return {
      portfolio,
      collectionRate,
      currentGap,
      branchCount: [...new Set(regionData.map(r => r.branch))].length
    };
  }

  // Channel Performance KPIs (38-45)
  getChannelData(channel: string) {
    const channelData = this.data.filter(r => r.channel === channel);
    const portfolio = channelData.reduce((sum, r) => sum + r.dueAmount, 0);
    const historicalData = channelData.filter(r => r.dueMonth !== 'Jul25');
    const totalDue = historicalData.reduce((sum, r) => sum + r.dueAmount, 0);
    const totalCollected = historicalData.reduce((sum, r) => sum + r.actCollection, 0);
    const collectionRate = totalDue > 0 ? (totalCollected / totalDue) * 100 : 0;
    
    return { portfolio, collectionRate };
  }

  // Product Performance KPIs (46-60)
  getProductData(product: string) {
    const productData = this.data.filter(r => r.product === product);
    const portfolio = productData.reduce((sum, r) => sum + r.dueAmount, 0);
    const historicalData = productData.filter(r => r.dueMonth !== 'Jul25');
    const totalDue = historicalData.reduce((sum, r) => sum + r.dueAmount, 0);
    const totalCollected = historicalData.reduce((sum, r) => sum + r.actCollection, 0);
    const collectionRate = totalDue > 0 ? (totalCollected / totalDue) * 100 : 0;
    
    return { portfolio, collectionRate };
  }

  // Monthly Trend KPIs (61-70)
  getMonthlyPerformance(month: string) {
    const monthData = this.data.filter(r => r.dueMonth === month && month !== 'Jul25');
    const totalDue = monthData.reduce((sum, r) => sum + r.dueAmount, 0);
    const totalCollected = monthData.reduce((sum, r) => sum + r.actCollection, 0);
    return totalDue > 0 ? (totalCollected / totalDue) * 100 : 0;
  }

  // Risk Assessment KPIs (71-80)
  getRiskAnalysis() {
    const currentData = this.data.filter(r => r.dueMonth === 'Jul25');
    const riskData = currentData.map(r => {
      const gap = r.dueAmount - r.predictedCollection;
      const gapPercentage = r.dueAmount > 0 ? (gap / r.dueAmount) * 100 : 0;
      return { ...r, gap, gapPercentage };
    });

    const highRisk = riskData.filter(r => r.gapPercentage > 15);
    const mediumRisk = riskData.filter(r => r.gapPercentage > 5 && r.gapPercentage <= 15);
    const lowRisk = riskData.filter(r => r.gapPercentage <= 5);

    return {
      highRisk: {
        count: highRisk.length,
        amount: highRisk.reduce((sum, r) => sum + r.dueAmount, 0)
      },
      mediumRisk: {
        count: mediumRisk.length,
        amount: mediumRisk.reduce((sum, r) => sum + r.dueAmount, 0)
      },
      lowRisk: {
        count: lowRisk.length,
        amount: lowRisk.reduce((sum, r) => sum + r.dueAmount, 0)
      }
    };
  }

  // Manager specific KPIs
  getBranchData(branch: string) {
    const branchData = this.data.filter(r => r.branch === branch);
    const portfolio = branchData.reduce((sum, r) => sum + r.dueAmount, 0);
    const historicalData = branchData.filter(r => r.dueMonth !== 'Jul25');
    const totalDue = historicalData.reduce((sum, r) => sum + r.dueAmount, 0);
    const totalCollected = historicalData.reduce((sum, r) => sum + r.actCollection, 0);
    const collectionRate = totalDue > 0 ? (totalCollected / totalDue) * 100 : 0;
    
    return { 
      portfolio, 
      collectionRate,
      region: branchData[0]?.region,
      channel: branchData[0]?.channel
    };
  }

  // Prediction accuracy for historical months
  getPredictionAccuracy() {
    const historicalData = this.data.filter(r => r.dueMonth !== 'Jul25');
    let totalAccuracy = 0;
    let count = 0;

    historicalData.forEach(record => {
      if (record.actCollection > 0 && record.predictedCollection > 0) {
        const accuracy = Math.min(record.actCollection, record.predictedCollection) / 
                        Math.max(record.actCollection, record.predictedCollection);
        totalAccuracy += accuracy;
        count++;
      }
    });

    return count > 0 ? (totalAccuracy / count) * 100 : 0;
  }
}

export const kpiCalculator = new KPICalculator(mockData);