import { provideMetrics } from '../lib/metricsProvider.js';
import { consumeMetric } from '../lib/metricsConsumer.js';
import { Log } from '../lib/logger.js';

export function initMetrics() {
    process.env.LOGS && Log('[Metrics]', 'init');
    provideMetrics(consumeMetric);
}
