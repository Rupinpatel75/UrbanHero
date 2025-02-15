import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as path from "path";
import * as fs from "fs";
import archiver from "archiver";

export async function registerRoutes(app: Express): Promise<Server> {
  // Download project endpoint
  app.get("/api/download", (req, res) => {
    const output = fs.createWriteStream("project.zip");
    const archive = archiver("zip", {
      zlib: { level: 9 } // Maximum compression
    });

    output.on("close", () => {
      fs.readFile("project.zip", (err, data) => {
        if (err) {
          res.status(500).send("Error creating zip file");
          return;
        }
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=smartcity-project.zip");
        res.send(data);
        // Clean up the zip file
        fs.unlink("project.zip", (err) => {
          if (err) console.error("Error deleting zip file:", err);
        });
      });
    });

    archive.on("error", (err) => {
      res.status(500).send("Error creating zip file");
    });

    archive.pipe(output);

    // Add all project files to the zip
    const projectRoot = path.resolve(__dirname, "..");
    archive.directory(path.join(projectRoot, "client"), "client");
    archive.directory(path.join(projectRoot, "server"), "server");
    archive.directory(path.join(projectRoot, "shared"), "shared");
    archive.directory(path.join(projectRoot, "public"), "public");
    archive.file(path.join(projectRoot, "package.json"), { name: "package.json" });
    archive.file(path.join(projectRoot, "tsconfig.json"), { name: "tsconfig.json" });
    archive.file(path.join(projectRoot, "theme.json"), { name: "theme.json" });

    archive.finalize();
  });

  const httpServer = createServer(app);
  return httpServer;
}