import Link from 'next/link';
import  {Button} from '@/components/ui/button';
import  './not-found.css';

export default function NotFound() {
  return (
        <div className="maintenance-container">
          <div className="maintenance-icon">
            <span className="maintenance-icon-cross">☦</span>
          </div>
          <h1 className="maintenance-title">
            Under Spiritual & Digital Restoration
          </h1>
          <p className="maintenance-description">
            We are currently working diligently to build and edify this page for our parish community.
            May your journey be blessed—please return shortly.
          </p>
            <Button asChild variant="outline" size="lg">
                <Link href="/" className="site-button">
                    Return to Home
                </Link>
            </Button>
        </div>
     
  );
}
