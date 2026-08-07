import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Browser } from "puppeteer";
import puppeteer from "puppeteer-core";

@Injectable()
export class BrowserService implements OnModuleInit, OnModuleDestroy {
  private browser!: Browser;

  async onModuleInit() {
    this.browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    this.browser.on("disconnected", () => {
      console.error("Chromium disconnected");
    });
  }

  getBrowser() {
    return this.browser;
  }

  async onModuleDestroy() {
    await this.browser?.close();
  }
}