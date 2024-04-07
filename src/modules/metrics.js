import { provideMetrics } from "../lib/metricsProvider.js";
import { consumeMetric } from "../lib/metricsConsumer.js";


export function initMetrics(){
    console.log('[Metrics]', 'init')
    provideMetrics(consumeMetric)
}
