import { BadRequestException } from '@nestjs/common';
import { RevenueResult } from './dto';

class FeeCalculator {
  calculateRevenue(
    no_of_desks: number,
    arpm: number,
    total_months: number,
    escalation: number = 0.06,
  ): RevenueResult {
    const year_prices: number[] = new Array(5).fill(0);

    if (total_months > 12) {
      const year1 = no_of_desks * arpm * 12;
      year_prices[0] = year1;

      year_prices[1] =
        total_months - 12 > 12
          ? year1 + year1 * escalation
          : (no_of_desks * arpm + no_of_desks * arpm * escalation) *
            (total_months - 12);

      year_prices[2] =
        total_months - 24 > 12
          ? year_prices[1] + year_prices[1] * escalation
          : (year_prices[1] / 12) * (total_months - 24) +
            (year_prices[1] / 12) * (total_months - 24) * escalation;

      year_prices[3] =
        total_months - 36 > 12
          ? year_prices[2] + year_prices[2] * escalation
          : (year_prices[2] / 12) * (total_months - 36) +
            (year_prices[2] / 12) * (total_months - 36) * escalation;

      year_prices[4] =
        total_months - 48 > 12
          ? year_prices[3] + year_prices[3] * escalation
          : (year_prices[3] / 12) * (total_months - 48) +
            (year_prices[3] / 12) * (total_months - 48) * escalation;
    } else {
      year_prices[0] = no_of_desks * arpm * total_months;
    }

    const tcv = year_prices.reduce((acc, val) => acc + val, 0);
    const acv = this.calculateACV(tcv, total_months);
    return new RevenueResult(
      year_prices,
      tcv,
      acv,
      this.calculateBrokerage(total_months, year_prices, acv),
    );
  }

  calculateRevenueFinal(
    no_of_desks: number,
    arpm: number,
    total_months: number,
    escalation: number = 0.06,
  ): RevenueResult {
    const year_prices: number[] = new Array(5).fill(0);

    // Year 1 calculation
    if (total_months >= 12) {
      year_prices[0] = no_of_desks * 12 * arpm;
    } else {
      year_prices[0] = no_of_desks * arpm * total_months;
    }

    // Year 2 calculation
    if (total_months >= 24) {
      year_prices[1] = 12 * no_of_desks * arpm * (1 + escalation);
    } else if (total_months >= 13) {
      year_prices[1] =
        no_of_desks * (total_months - 12) * arpm * (1 + escalation);
    }

    // Year 3 calculation
    if (total_months >= 36) {
      year_prices[2] = no_of_desks * 12 * arpm * Math.pow(1 + escalation, 2);
    } else if (total_months >= 25) {
      year_prices[2] =
        no_of_desks * (total_months - 24) * arpm * Math.pow(1 + escalation, 2);
    }

    // Year 4 calculation
    if (total_months >= 48) {
      year_prices[3] = no_of_desks * 12 * arpm * Math.pow(1 + escalation, 3);
    } else if (total_months >= 37) {
      year_prices[3] =
        no_of_desks * (total_months - 36) * arpm * Math.pow(1 + escalation, 3);
    }

    // Year 5 calculation
    if (total_months >= 60) {
      year_prices[4] = no_of_desks * 12 * arpm * Math.pow(1 + escalation, 4);
    } else if (total_months >= 49) {
      year_prices[4] =
        no_of_desks * (total_months - 48) * arpm * Math.pow(1 + escalation, 4);
    }

    const tcv = year_prices.reduce((acc, val) => acc + val, 0);
    const acv = this.calculateACV(tcv, total_months);

    return new RevenueResult(
      year_prices,
      tcv,
      acv,
      this.calculateBrokerage(total_months, year_prices, acv),
    );
  }

  calculateACV(tcv: number, total_months: number): number {
    return total_months > 12 ? Math.floor((tcv / total_months) * 12) : tcv;
  }

  calculateBrokerage(
    total_months: number,
    year_prices: number[],
    acv: number,
  ): number {
    if (total_months < 18) {
      return Math.floor(0.1 * year_prices[0] + 0.03 * year_prices[0]);
    } else if (total_months >= 18 && total_months <= 35) {
      return Math.floor(0.15 * acv);
    } else if (total_months >= 36 && total_months <= 60) {
      return Math.floor(0.18 * acv);
    } else {
      throw new BadRequestException('Invalid total months value');
    }
  }
}

export const feeCalculator = new FeeCalculator();
