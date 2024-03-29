import { Component, h, Prop } from '@stencil/core';

import { withComponentRegistry } from '../../../core/player/withComponentRegistry';

/**
 * Formats and displays a length of time provided in seconds.
 *
 * ## Visual
 *
 * <img
 *   src="https://raw.githubusercontent.com/vime-js/vime/master/packages/core/src/components/ui/time/time/time.png"
 *   alt="Vime time component"
 * />
 */
@Component({
  tag: 'vm-time-progress',
  styleUrl: 'time-progress.css',
  shadow: true,
})
export class TimeProgress {
  /**
   * The string used to separate the current time and end time.
   */
  @Prop() separator = '/';

  /**
   * Whether the times should always show the hours unit, even if the time is less than
   * 1 hour (eg: `20:35` -> `00:20:35`).
   */
  @Prop() alwaysShowHours = false;

  constructor() {
    withComponentRegistry(this);
  }

  render() {
    return (
      <div class="timeProgress">
        <vm-current-time alwaysShowHours={this.alwaysShowHours} />
        <span class="separator">{this.separator}</span>
        <vm-end-time alwaysShowHours={this.alwaysShowHours} />
      </div>
    );
  }
}
