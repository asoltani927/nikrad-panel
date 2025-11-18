-- AddForeignKey
ALTER TABLE "needs" ADD CONSTRAINT "needs_province_code_fkey" FOREIGN KEY ("province_code") REFERENCES "regions"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
