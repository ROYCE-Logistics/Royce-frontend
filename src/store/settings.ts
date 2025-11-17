import { defineStore } from 'pinia';

interface Integration {
  name: string;
  status: 'connected' | 'disconnected' | 'coming-soon';
  description: string;
}

interface SettingsState {
  organization: {
    name: string;
    dotNumber: string;
    timezone: string;
  };
  integrations: Integration[];
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    organization: {
      name: 'A1 Logistics',
      dotNumber: '1234567',
      timezone: 'America/Chicago'
    },
    integrations: [
      { name: 'Samsara', status: 'connected', description: 'Telematics + dashcams' },
      { name: 'Amazon Relay', status: 'connected', description: 'Amazon load board' },
      { name: 'DAT', status: 'disconnected', description: 'Load board & market rates' },
      { name: 'TruckStop', status: 'disconnected', description: 'Broker load board' },
      { name: 'QuickBooks', status: 'connected', description: 'Accounting sync' },
      { name: 'FlexPay', status: 'coming-soon', description: 'Settlement automation' }
    ]
  }),
  actions: {
    updateOrganization(payload: Partial<SettingsState['organization']>) {
      this.organization = { ...this.organization, ...payload };
    },
    toggleIntegration(name: string) {
      this.integrations = this.integrations.map((integration) =>
        integration.name === name
          ? {
              ...integration,
              status: integration.status === 'connected' ? 'disconnected' : 'connected'
            }
          : integration
      );
    }
  }
});
